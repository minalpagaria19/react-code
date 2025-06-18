
function displaySelectedText(selectedText) {
  var selectedTextContainer = document.getElementById('selectedTextContainer');
  if (selectedTextContainer) {
    selectedTextContainer.textContent = selectedText || 'No text selected.';
  }
}
function displaySelectedError(selectedText) {
  var selectedTextContainer = document.getElementById('errorTag');
  if (selectedTextContainer) {
    selectedTextContainer.textContent = selectedText;
  }
}

async function callApi(requestData,api) {
  try {
    const response = await (async ({ url, data }) => {
      const fetchResponse = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      return await fetchResponse.json();
    })({ url: api, data: requestData });

    console.log("api res is", response);

    return response;
  } catch (error) {
    console.error("error", error);
    throw error; // Handle the error appropriately based on your use case.
  }
}

function showLoginUI() {
  document.getElementById("loginDiv").style.display = "block";
  document.getElementById("leadDivId").style.display = "none";
  document.getElementById("AddMore").style.display = "none";
}

function showLeadAddUI() {
  const inputsForLogin = document.querySelectorAll('#userName, #password');

  inputsForLogin.forEach(input => {
      input.value = '';
  });
  document.getElementById("loginDiv").style.display = "none";
  document.getElementById("leadDivId").style.display = "block";
  document.getElementById("AddMore").style.display = "none";
}



var tokenss; 
function getT() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(['sessionId'], result => {
      const tokenData = result.sessionId;
      if (tokenData) {
        const currentTime = new Date().getTime();
        if (currentTime > tokenData.expirationTime) {
          // Token has expired, remove it from storage
          chrome.storage.local.remove('sessionId', function() {
            console.log('Expired token removed');
          });
          // Resolve with null token indicating expiration
          resolve(null);
        } else {
          resolve(tokenData.token);
        }
      } else {
        resolve(null);
      }
    });
  });
}


async function validateToken(){
  const sessionId = await getT();
  tokenss = sessionId;
  console.log("token is", tokenss);
  if(tokenss){
    try{
  const response1 = await fetch(`https://dev.allcadservices.com/local/session.php??validate=${tokenss}`);
  console.log("valid token res",response1)
      if(response1.ok){
        return "success"
      }
      else{
            return "error"
      }
   }catch(error){
  console.log(error)
  return "error"
   }

  }else{
    console.log("local storage not set cookie")
    return "error"
  }
}

document.addEventListener('DOMContentLoaded', async function () {

  try {
    const tokenn = await validateToken();
    
    console.log("token is vvvv", tokenn);

    if (tokenn=="success") {
      showLeadAddUI();
  
    } else {
      showLoginUI();
    }
  } catch (error) {
    console.error("Error fetching token:", error);
  }

  const addContactInfoButton = document.getElementById("addContactInfo");
  const contactInfoSection = document.getElementById("contactInfoSection");


 
  addContactInfoButton.addEventListener("click", function () {
    // Toggle the visibility of the contact info section
    if (contactInfoSection.style.display === "none") {
      contactInfoSection.style.display = "block";
    } else {
      contactInfoSection.style.display = "none";
    }
  });

  document.getElementById("loginButton").addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
      const apiUrl = "https://dev.allcadservices.com/local/userLogin.php";
      const apiUrlAuth = "https://dev.allcadservices.com/local/session.php";

      let userName = document.getElementById("userName").value
      let password = document.getElementById("password").value
      console.log(userName,password)
  
      try {
        const response = await fetch(`${apiUrl}?userName=${userName}&password=${password}`);
      
        
        console.log(response)
        const data = await response.json();
     
        console.log("API response:", data);
     
        if(!data.ERROR_TYPE){
          if (tabs.length > 0) {
          chrome.tabs.sendMessage(tabs[0].id, { action: "login",tokenData: data }, async function (response) {
          console.log("login check",response)
          try {
            const sessionId = await getT();
            tokenss = sessionId;
            console.log("token is", tokenss);
        
            if (tokenss) {
              const res = await fetch(`${apiUrlAuth}?validate=${tokenss}`);
              console.log("valid token res",res)
              if(res.ok){
                showLeadAddUI();
              }else{
                alert("not valid token")
                showLoginUI();
              }
              
            } else {
              alert("token in not created ")
              showLoginUI();
            }
          } catch (error) {
            console.error("Error fetching token:", error);
          }
    
          });
        }else{
          console.log("no tab exist")
        }

          
        }else{
          console.log(data)
          alert(data.MESSAGE)
        }
        } catch (error) {
        console.error("Error during API call:", error);
      }
 

    })
})

document.getElementById("logout").addEventListener("click", async function () {
  chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
    const apiUrlForlogout = "https://dev.allcadservices.com/local/session.php";
  console.log("click on logout")
    try {
      const sessionId = await getT();
      tokenss = sessionId;
      console.log("token is", tokenss);
      if(tokenss){
        const responseForLogout = await fetch(`${apiUrlForlogout}?destroy=${tokenss}`);
        console.log("logout successfully for",responseForLogout)
        if(responseForLogout.ok){
          chrome.storage.local.remove('sessionId', function() {
            console.log('Expired token removed');
            showLoginUI();
          });
        }else{
          console.log("error in token remove")
          chrome.storage.local.remove('sessionId', function() {
            console.log('Expired token from local removed');
            
          });

        }
      }
      } catch (error) {
      console.error("Error during API call:", error);
    }
  })
})

  document.getElementById("AddMore").addEventListener("click", async function () {
      chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
          document.getElementById("leadDivId").style.display = "block"
          document.getElementById("AddMore").style.display = "none"
          document.getElementById('leadName').textContent = "";
          document.getElementById('selectedTextContainer').textContent = "";
          document.getElementById("successimg").style.display = "none"
          const inputs = document.querySelectorAll('#companyName, #companyEmail, #contactName, #websiteName,#additionalInfo ,#companyContactNo');

          inputs.forEach(input => {
              input.value = '';
          });
      })
  })

  document.getElementById("retrieveButton").addEventListener("click", async function () {
  
    chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
      const website = document.getElementById("websiteName").value||'';
      let email = document.getElementById("companyEmail").value||'';
      let location= document.getElementById("additionalInfo").value||'';
      let contactName= document.getElementById("contactName").value||'';
      let contactEmail= document.getElementById("companyEmail").value||'';
      let contactMobileNo= document.getElementById("companyContactNo").value||'';
      const verticalElement = document.getElementById('mySelect');
      // Get the selected option's value
      const vertical = verticalElement.value||'';   
      // Log the selected value
      console.log(vertical);
      
      chrome.tabs.sendMessage(tabs[0].id, { action: "retrieveData" }, async function (response) {
 
       
        // Set the value of the input to the selectedret text
          console.log("Data retrieval request sent successfully.");
          let selectedText1 = document.getElementById('companyName').value
    
          if (selectedText1&&website) {
            let valid = await validateToken();
            if(valid=="success"){
              const retrieveButton = document.getElementById("retrieveButton");
  
              // Show loader inside the button
              retrieveButton.innerHTML = '<span class="loader"></span>';
              
              // Disable the button
              retrieveButton.disabled = true;
       
                    let leadCheckApi = "https://dev.allcadservices.com/rest/1/7lokzodi02qebcyy/crm.lead.list"
                    const requestForLead = {
                      filter: {
                        TITLE: selectedText1,
                      },
                    };
                    await callApi(requestForLead,leadCheckApi).then(async(response) => {
                      console.log("then excecute");
                      if(response.result.length==0){
                        let leadCreateApi = "https://dev.allcadservices.com/rest/1/7lokzodi02qebcyy/crm.lead.add";
                        let  reqDataForLeadAdd = {
                          "fields": {
                            "TITLE": selectedText1,
                            "SOURCE_ID": "WEB",
                            "UF_CRM_1710406712954": website,
                            "UF_CRM_1710315781643":vertical,
                            "ADDRESS":location
                          }
                        }
                        console.log(reqDataForLeadAdd)
                            await callApi(reqDataForLeadAdd,leadCreateApi).then(async(response) => {
                              console.log("then excecute")
                              console.log("lead Add successfully",response.result)
                              if(response.result){
                              let leadId = response.result;
                              if(contactName){
                                let reqDataForContact = {
                                  "fields": {
                                      "NAME":contactName,
                                      "EMAIL": [
                                          {
                                              "VALUE": contactEmail
                                          }
                                      ],
                                      "PHONE":[
                                        {
                                          "VALUE":contactMobileNo
                                        }
                                      ]
                                
                                  }
                                }
                                let apiUrlForContact = "https://dev.allcadservices.com/rest/1/7lokzodi02qebcyy/crm.contact.add"
                                await callApi(reqDataForContact,apiUrlForContact).then(async(response) => {
                                  console.log("then excecute")
                                  console.log("reqDataForContact",reqDataForContact)
                                  console.log("contact Add successfully",response.result)
                                  if(response.result){
                                    let contactId = response.result;
                                    let apiForConnectContact = "https://dev.allcadservices.com/rest/1/7lokzodi02qebcyy/crm.lead.update";
                                    let apiForRequest  = {
                                      "id": leadId,
                                      "fields": {
                                          "CONTACT_ID": contactId
                                      }
                                  } 
                                    await callApi(apiForRequest,apiForConnectContact).then(async(response) => {
                                      console.log("then excecute")
                                      console.log("contact connect with lead successfully",response.result)
                                                     
                                    }).catch((error) => {
                                      console.error("Error during asynchronous operations:", error);
                                    });
                                  }
                                                 
                                }).catch((error) => {
                                  console.error("Error during asynchronous operations:", error);
                                });
                              }else{
                                console.log("contact name mention in input")
                              }
                              }
                                            
                            }).catch((error) => {
                              console.error("Error during asynchronous operations:", error);
                            });
                      }else{
                       console.log("lead already exist")
                      }
                 
                                     
                    }).catch((error) => {
                      console.error("Error during asynchronous operations:", error);
                    });



                   
                    document.getElementById('leadName').textContent = "";

                    displaySelectedText("Lead has been successfully sent");
                    displaySelectedError("");
                    document.getElementById("leadDivId").style.display = "none"
                    document.getElementById("AddMore").style.display = "block"
                    document.getElementById("successimg").style.display = "block"
      
            retrieveButton.innerHTML = 'Add Lead';
            document.getElementById("retrieveButton").disabled = false;
          }else{

          }

          } else {
            document.getElementById('leadName').textContent = "";
            
                  
            displaySelectedError("Company name and website cannot be blank");
          }
      
      });
    });
  });

});
