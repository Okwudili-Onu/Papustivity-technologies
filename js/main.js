
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const page = document.body.className.split("-")[0] || "home";
  const current = page === "home" ? "home" : page;
  const activeLink = document.querySelector(`[data-nav="${current}"]`);
  if (activeLink) activeLink.classList.add("active");

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const form = document.getElementById("contact-form");
  const interestSelect = document.getElementById("interest");
  const requestedInterest = new URLSearchParams(window.location.search).get("interest");
  if (interestSelect && requestedInterest) {
    const matchingOption = Array.from(interestSelect.options).find(option => option.value === requestedInterest || option.text === requestedInterest);
    if (matchingOption) interestSelect.value = matchingOption.value || matchingOption.text;
  }
  if (form) {
    const status = document.getElementById("form-status");
    const submit = form.querySelector("button[type='submit']");
    const submitText = submit?.querySelector(".submit-text");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      submit.disabled = true;
      if (submitText) submitText.textContent = "Sending...";
      status.textContent = "";
      status.className = "form-status";

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { "Accept": "application/json" }
        });

        if (response.ok) {
          form.reset();
          status.textContent = "Thank you. Your enquiry has been sent successfully.";
          status.classList.add("success");
        } else {
          const data = await response.json().catch(() => null);
          const message = data?.errors?.map(error => error.message).join(", ");
          throw new Error(message || "Unable to send your enquiry right now.");
        }
      } catch (error) {
        status.textContent = "We couldn't send the form. Please try again or email Info@papustivitytechnologies.com.";
        status.classList.add("error");
      } finally {
        submit.disabled = false;
        if (submitText) submitText.textContent = "Send Enquiry";
      }
    });
  }
});
