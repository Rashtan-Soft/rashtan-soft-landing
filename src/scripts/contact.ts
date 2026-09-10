(() => {
  const form = document.querySelector<HTMLFormElement>("[data-contact-form]");

  if (!form || !window.fetch) {
    return;
  }

  const submitButton = form.querySelector<HTMLButtonElement>("[type=submit]");
  const status = form.querySelector<HTMLElement>("[data-form-status]");
  const defaultButtonLabel = submitButton ? submitButton.textContent : "Send message";

  const setStatus = (message: string, state: "success" | "error") => {
    if (!status) return;
    status.hidden = false;
    status.textContent = message;
    status.dataset.state = state;
  };

  const setSubmitting = (isSubmitting: boolean) => {
    if (!submitButton) return;
    submitButton.disabled = isSubmitting;
    submitButton.textContent = isSubmitting ? "Sending…" : defaultButtonLabel;
    form.setAttribute("aria-busy", String(isSubmitting));
  };

  const getErrorMessage = (response: Response | null, payload: { errors?: Array<{ message?: string }> } | null) => {
    if (payload && Array.isArray(payload.errors) && payload.errors.length) {
      return payload.errors.map((error) => error.message || "Please check the information and try again.").join(" ");
    }

    if (response && response.status === 429) {
      return "The form is temporarily busy. Please wait a moment, then try again or email me directly.";
    }

    return "I could not send your message. Please try again or email me directly.";
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 15000);
    setSubmitting(true);
    if (status) status.hidden = true;

    try {
      const response = await window.fetch(form.action, {
        method: form.method || "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
        signal: controller.signal
      });
      let payload = null;

      try {
        payload = await response.json();
      } catch {
        payload = null;
      }

      if (!response.ok) {
        setStatus(getErrorMessage(response, payload), "error");
        return;
      }

      form.reset();
      setStatus("Thanks — your message was accepted. I’ll reply by email.", "success");
    } catch (error) {
      setStatus(error instanceof DOMException && error.name === "AbortError"
        ? "I could not confirm delivery in time. Please try again or email me directly."
        : "I could not send your message. Please try again or email me directly.", "error");
    } finally {
      window.clearTimeout(timeoutId);
      setSubmitting(false);
    }
  });
})();
