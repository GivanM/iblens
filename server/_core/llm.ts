import { ENV } from "./env";

export type Role = "system" | "user" | "assistant" | "tool" | "function";

export type TextContent = {
  type: "text";
  text: string;
};

export type ImageContent = {
  type: "image_url";
  image_url: {
    url: string;
    detail?: "auto" | "low" | "high";
  };
};

export type FileContent = {
  type: "file_url";
  file_url: {
    url: string;
    mime_type?: "audio/mpeg" | "audio/wav" | "application/pdf" | "audio/mp4" | "video/mp4";
  };
};

export type MessageContent = string | TextContent | ImageContent | FileContent;

export type Message = {
  role: Role;
  content: MessageContent | MessageContent[];
  name?: string;
  tool_call_id?: string;
};

export type Tool = {
  type: "function";
  function: {
    name: string;
    description?: string;
    parameters?: Record<string, unknown>;
  };
};

export type ToolChoicePrimitive = "none" | "auto" | "required";
export type ToolChoiceByName = { name: string };
export type ToolChoiceExplicit = {
  type: "function";
  function: {
    name: string;
  };
};

export type ToolChoice =
  | ToolChoicePrimitive
  | ToolChoiceByName
  | ToolChoiceExplicit;

export type InvokeParams = {
  messages: Message[];
  tools?: Tool[];
  toolChoice?: ToolChoice;
  tool_choice?: ToolChoice;
  maxTokens?: number;
  max_tokens?: number;
  outputSchema?: OutputSchema;
  output_schema?: OutputSchema;
  responseFormat?: ResponseFormat;
  response_format?: ResponseFormat;
};

export type ToolCall = {
  id: string;
  type: "function";
  function: {
    name: string;
    arguments: string;
  };
};

export type InvokeResult = {
  id: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: Role;
      content: string | Array<TextContent | ImageContent | FileContent>;
      tool_calls?: ToolCall[];
    };
    finish_reason: string | null;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};

export type JsonSchema = {
  name: string;
  schema: Record<string, unknown>;
  strict?: boolean;
};

export type OutputSchema = JsonSchema;

export type ResponseFormat =
  | { type: "text" }
  | { type: "json_object" }
  | { type: "json_schema"; json_schema: JsonSchema };

// ─── Anthropic message transformation ────────────────────────────────────────

function toAnthropicContent(
  parts: MessageContent[]
): string | Array<Record<string, unknown>> {
  const blocks: Array<Record<string, unknown>> = [];

  for (const part of parts) {
    if (typeof part === "string") {
      blocks.push({ type: "text", text: part });
    } else if (part.type === "text") {
      blocks.push({ type: "text", text: part.text });
    } else if (part.type === "image_url") {
      blocks.push({
        type: "image",
        source: { type: "url", url: part.image_url.url },
      });
    } else if (part.type === "file_url") {
      blocks.push({
        type: "document",
        source: { type: "url", url: part.file_url.url },
      });
    }
  }

  if (blocks.length === 1 && blocks[0].type === "text") {
    return blocks[0].text as string;
  }
  return blocks;
}

function toAnthropicMessages(messages: Message[]): {
  system?: string;
  messages: Array<Record<string, unknown>>;
} {
  let system: string | undefined;
  const result: Array<Record<string, unknown>> = [];

  for (const msg of messages) {
    if (msg.role === "system") {
      const parts = Array.isArray(msg.content) ? msg.content : [msg.content];
      const text = parts
        .map((p) => (typeof p === "string" ? p : (p as TextContent).text ?? ""))
        .join("\n");
      system = system ? `${system}\n${text}` : text;
      continue;
    }

    if (msg.role === "tool" || msg.role === "function") {
      const toolContent =
        typeof msg.content === "string"
          ? msg.content
          : Array.isArray(msg.content)
            ? msg.content
                .map((p) => (typeof p === "string" ? p : JSON.stringify(p)))
                .join("\n")
            : JSON.stringify(msg.content);

      const toolResult: Record<string, unknown> = {
        type: "tool_result",
        tool_use_id: msg.tool_call_id ?? "",
        content: toolContent,
      };

      const last = result[result.length - 1];
      if (last && last.role === "user" && Array.isArray(last.content)) {
        (last.content as unknown[]).push(toolResult);
      } else {
        result.push({ role: "user", content: [toolResult] });
      }
      continue;
    }

    const parts = Array.isArray(msg.content) ? msg.content : [msg.content];
    result.push({ role: msg.role, content: toAnthropicContent(parts) });
  }

  return { system, messages: result };
}

function toAnthropicTools(tools: Tool[]): Array<Record<string, unknown>> {
  return tools.map((t) => ({
    name: t.function.name,
    description: t.function.description,
    input_schema: t.function.parameters ?? { type: "object", properties: {} },
  }));
}

function toAnthropicToolChoice(tc: ToolChoice): Record<string, unknown> {
  if (tc === "auto") return { type: "auto" };
  if (tc === "none") return { type: "none" };
  if (tc === "required") return { type: "any" };
  if ("name" in tc) return { type: "tool", name: tc.name };
  if ("type" in tc && tc.type === "function") {
    return { type: "tool", name: (tc as ToolChoiceExplicit).function.name };
  }
  return { type: "auto" };
}

function fromAnthropicResponse(data: Record<string, unknown>): InvokeResult {
  const content = (data.content as Array<Record<string, unknown>>) ?? [];
  let textContent = "";
  const toolCalls: ToolCall[] = [];

  for (const block of content) {
    if (block.type === "text") {
      textContent += block.text as string;
    } else if (block.type === "tool_use") {
      toolCalls.push({
        id: block.id as string,
        type: "function",
        function: {
          name: block.name as string,
          arguments: JSON.stringify(block.input),
        },
      });
    }
  }

  const usage = data.usage as Record<string, number> | undefined;

  return {
    id: data.id as string,
    created: Math.floor(Date.now() / 1000),
    model: data.model as string,
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: textContent,
          ...(toolCalls.length > 0 ? { tool_calls: toolCalls } : {}),
        },
        finish_reason: (data.stop_reason as string) ?? null,
      },
    ],
    usage: usage
      ? {
          prompt_tokens: usage.input_tokens,
          completion_tokens: usage.output_tokens,
          total_tokens: usage.input_tokens + usage.output_tokens,
        }
      : undefined,
  };
}

function normalizeResponseFormat({
  responseFormat,
  response_format,
  outputSchema,
  output_schema,
}: {
  responseFormat?: ResponseFormat;
  response_format?: ResponseFormat;
  outputSchema?: OutputSchema;
  output_schema?: OutputSchema;
}): Record<string, unknown> | undefined {
  const explicitFormat = responseFormat ?? response_format;
  const schema = outputSchema ?? output_schema;

  if (explicitFormat?.type === "json_object" || schema) {
    // Anthropic doesn't have json_schema mode — instruct via system prompt
    // caller should use tool-based structured output for strict schemas
    return undefined;
  }

  return undefined;
}

// ─── Main invocation ─────────────────────────────────────────────────────────

export async function invokeLLM(params: InvokeParams): Promise<InvokeResult> {
  if (!ENV.anthropicApiKey) {
    throw new Error("ANTHROPIC_API_KEY is not configured");
  }

  const {
    messages,
    tools,
    toolChoice,
    tool_choice,
    maxTokens,
    max_tokens,
    outputSchema,
    output_schema,
    responseFormat,
    response_format,
  } = params;

  const { system, messages: anthMessages } = toAnthropicMessages(messages);

  const payload: Record<string, unknown> = {
    model: ENV.anthropicModel,
    max_tokens: maxTokens ?? max_tokens ?? 32768,
    messages: anthMessages,
  };

  if (system) {
    payload.system = system;
  }

  if (tools && tools.length > 0) {
    payload.tools = toAnthropicTools(tools);
    const tc = toolChoice ?? tool_choice;
    if (tc) {
      payload.tool_choice = toAnthropicToolChoice(tc);
    }
  }

  normalizeResponseFormat({ responseFormat, response_format, outputSchema, output_schema });

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": ENV.anthropicApiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `LLM invoke failed: ${response.status} ${response.statusText} – ${errorText}`
    );
  }

  const data = (await response.json()) as Record<string, unknown>;
  return fromAnthropicResponse(data);
}
