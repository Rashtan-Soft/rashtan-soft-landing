(function () {
  "use strict";

  var form = document.querySelector("[data-contact-form]");

  if (!form || !window.fetch) {
    return;
  }

  var submitButton = form.querySelector("[type=submit]");
  var status = form.querySelector("[data-form-status]");
  var defaultButtonLabel = submitButton ? submitButton.textContent : "Send message";

  function setStatus(message, state) {
    if (!status) {
      return;
    }

    status.hidden = false;
    status.textContent = message;
    status.dataset.state = state;
  }

  function setSubmitting(isSubmitting) {
    if (!submitButton) {
      return;
    }

    submitButton.disabled = isSubmitting;
    submitButton.textContent = isSubmitting ? "Sending…" : defaultButtonLabel;
    form.setAttribute("aria-busy", String(isSubmitting));
  }

  function getErrorMessage(response, payload) {
    if (payload && Array.isArray(payload.errors) && payload.errors.length) {
      return payload.errors.map(function (error) {
        return error.message || "Please check the information and try again.";
      }).join(" ");
    }

    if (response && response.status === 429) {
      return "The form is temporarily busy. Please wait a moment, then try again or email me directly.";
    }

    return "I could not send your message. Please try again or email me directly.";
  }

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    var controller = new AbortController();
    var timeoutId = window.setTimeout(function () {
      controller.abort();
    }, 15000);

    setSubmitting(true);
    if (status) {
      status.hidden = true;
    }

    try {
      var response = await window.fetch(form.action, {
        method: form.method || "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
        signal: controller.signal
      });
      var payload = null;

      try {
        payload = await response.json();
      } catch (parseError) {
        payload = null;
      }

      if (!response.ok) {
        setStatus(getErrorMessage(response, payload), "error");
        return;
      }

      form.reset();
      setStatus("Thanks — your message was accepted. I’ll reply by email.", "success");
    } catch (error) {
      if (error && error.name === "AbortError") {
        setStatus("I could not confirm delivery in time. Please try again or email me directly.", "error");
      } else {
        setStatus("I could not send your message. Please try again or email me directly.", "error");
      }
    } finally {
      window.clearTimeout(timeoutId);
      setSubmitting(false);
    }
  });
})();
