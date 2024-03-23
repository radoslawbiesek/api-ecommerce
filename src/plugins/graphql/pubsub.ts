export class PubSub {
  private readonly webhookUrl: string;
  private readonly MAX_RETRIES = 3;

  constructor() {
    if (!process.env.WEBHOOK_URL) {
      throw new Error("WEBHOOK_URL is required");
    }
    this.webhookUrl = process.env.WEBHOOK_URL;
  }

  async #sendEvent(event: { topic: string; payload: unknown }, retriesLeft = this.MAX_RETRIES): Promise<void> {
    if (retriesLeft <= 0) {
      return;
    }

    const result = await fetch(this.webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });

    if (result.status !== 200 && result.status !== 204) {
      return this.#sendEvent(event, retriesLeft - 1);
    }
  }

  publish(event: { topic: string; payload: unknown }): void {
    void this.#sendEvent(event);
  }
}
