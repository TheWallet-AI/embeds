<script context="module" lang="ts">
  export type EmbedSignDocumentProps = {
    className?: string;
    host?: string;
    token: string; // @src: /apps/web/src/app/embed/direct/[[...url]]/schema

    css?: string | undefined;
    cssVars?: Record<string, string> | undefined;
    name?: string | undefined;
    lockName?: boolean | undefined;
    onDocumentReady?: () => void;
    onDocumentCompleted?: (data: {
      token: string;
      documentId: number;
      recipientId: number;
    }) => void;
    onDocumentError?: (error: string) => void;
  };
</script>

<script lang="ts">
  import { onDestroy, onMount } from "svelte";

  export let host: EmbedSignDocumentProps["host"] = undefined;
  export let name: EmbedSignDocumentProps["name"] = undefined;
  export let lockName: EmbedSignDocumentProps["lockName"] = undefined;
  export let css: EmbedSignDocumentProps["css"] = undefined;
  export let token: EmbedSignDocumentProps["token"];
  export let onDocumentReady: EmbedSignDocumentProps["onDocumentReady"] =
    undefined;
  export let onDocumentCompleted: EmbedSignDocumentProps["onDocumentCompleted"] =
    undefined;
  export let onDocumentError: EmbedSignDocumentProps["onDocumentError"] =
    undefined;
  export let className: EmbedSignDocumentProps["className"] = undefined;

  function handleMessage(event: MessageEvent) {
    if (__iframe?.contentWindow === event.source) {
      switch (event.data.action) {
        case "document-ready":
          onDocumentReady?.();
          break;

        case "document-completed":
          onDocumentCompleted?.(event.data.data);
          break;

        case "document-error":
          onDocumentError?.(event.data.data);
          break;
      }
    }
  }
  $: src = () => {
    const appHost = host || "https://thewallet.ai";
    const encodedOptions = btoa(
      JSON.stringify({
        name: name,
        lockName: lockName,
        css: css,
      })
    );
    const srcUrl = new URL(`/embed/sign/${token}`, appHost);
    return `${srcUrl}#${encodedOptions}`;
  };

  let __iframe;

  onMount(() => {
    window.addEventListener("message", handleMessage);
  });

  onDestroy(() => {
    window.removeEventListener("message", handleMessage);
  });
</script>

<iframe bind:this={__iframe} class={className} src={src()} />