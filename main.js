const conversation = document.getElementById('conversation');
let selectedCostume = '';
let isMale = true;
let counterTimes = 0;
const lineBreak = document.createElement('br');
const TIMEOUT = 800;
let isRefImageLoaded = false;
let isUploadedImageLoaded = false;

window.addEventListener('load', event => {
  localStorage.removeItem('userPhoto');
  localStorage.removeItem('selectedCostume');
});

function showImageResults() {
  console.log('showImageResults start');

  const messagePreImageDone = document.createElement('div');
  const chatbotResponse = document.createElement('div');
  chatbotResponse.classList.add('message', 'chatbot', 'image-container');
  messagePreImageDone.classList.add('message');

  messagePreImageDone.textContent = 'אוקיי סיימתי. מוכנים?';
  conversation.scrollTop = conversation.scrollHeight;

  setTimeout(function () {

    conversation.appendChild(messagePreImageDone);
    conversation.scrollTop = conversation.scrollHeight;

    setTimeout(function () {
      // create div for when pic didnt finish to upload

      isRefImageLoaded = false;
      isUploadedImageLoaded = false;

      const messageWhileLoading = document.createElement('div');
      messageWhileLoading.classList.add('loader');
      messageWhileLoading.textContent = 'התמונה בטעינה...';
      chatbotResponse.appendChild(messageWhileLoading);
      conversation.appendChild(chatbotResponse);
      conversation.scrollTop = conversation.scrollHeight;

      console.log('1');
      // uploaded
      const imgElement = document.createElement('img');
      imgElement.classList.add('user-image-' + selectedCostume);
      imgElement.src = localStorage.getItem('userPhoto');

      // our image
      const refElement = document.createElement('img');
      refElement.classList.add('reference-image');
      refElement.src = 'grave.jpg';

      refElement.onload  = () => {
        console.log('2 refElement true')
        isRefImageLoaded = true;
        showReallyTheResults(refElement,messageWhileLoading,chatbotResponse);
      }

      imgElement.onload  = () => {
        console.log('2 imgElement true')
        isUploadedImageLoaded = true;
        showReallyTheResults(refElement,messageWhileLoading,chatbotResponse);
      }

    }, TIMEOUT+TIMEOUT);
  }, TIMEOUT);
}

function showReallyTheResults(refImage, messageWhileLoading, chatbotResponse) {
  console.log('showReallyTheResults start');

  // Add a timeout to prevent infinite waiting
  const loadingTimeout = setTimeout(() => {
    if (!isRefImageLoaded || !isUploadedImageLoaded) {
      chatbotResponse.removeChild(messageWhileLoading);
      const errorMsg = document.createElement('div');
      errorMsg.textContent = 'טעינת התמונה נכשלה. נא לנסות שנית.';
      errorMsg.classList.add('error-message');
      chatbotResponse.appendChild(errorMsg);
      
      // Add a retry button
      const retryButton = document.createElement('button');
      retryButton.textContent = 'ניסיון נוסף';
      retryButton.addEventListener('click', () => {
        conversation.removeChild(chatbotResponse);
        showCostumeOptions();
      });
      chatbotResponse.appendChild(retryButton);
    }
  }, 10000); // 10 second timeout
  
  if (isRefImageLoaded && isUploadedImageLoaded) {
    clearTimeout(loadingTimeout);
    chatbotResponse.appendChild(refImage);
    chatbotResponse.removeChild(messageWhileLoading);
    conversation.scrollTop = conversation.scrollHeight;
    setTimeout(function() {
      showCostumeOptions();
    }, TIMEOUT);
  }
}

function showUploadButton() {


  // Create pre-upload message
  /*
  const messageUploadImage = document.createElement('div');
  messageUploadImage.classList.add('message', 'chatbot');
  const messageUploadP1 = document.createElement('p');
  messageUploadP1.textContent = 'כדי שאוכל להראות לכם את עתידכם אני צריכה שתעלו תמונת פנים שלכם';
  messageUploadImage.appendChild(messageUploadP1);
  conversation.appendChild(messageUploadImage);
  conversation.scrollTop = conversation.scrollHeight;
  */

  // Create button message
  const messageUploadButton = document.createElement('div');
  messageUploadButton.classList.add('message', 'chatbot','button-message');
  const uploadButton = document.createElement('button');
  uploadButton.textContent = 'העלאת תמונה';
  uploadButton.addEventListener('click', function handleFileUpload() {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.addEventListener('change', handleFileSelect);
      fileInput.click();

      function handleFileSelect(event) {
        const file = event.target.files[0];
        if (file && file.type.match('image.*')) {
          // Show loading indicator
          const loadingMessage = document.createElement('div');
          loadingMessage.classList.add('message', 'chatbot');
          loadingMessage.textContent = 'התמונה בטעינה...';
          conversation.appendChild(loadingMessage);
          conversation.scrollTop = conversation.scrollHeight;
          
          // Compress and resize image before storing
          compressImage(file, function(dataUrl) {
            localStorage.setItem('userPhoto', dataUrl);
            // Remove loading indicator
            conversation.removeChild(loadingMessage);
            uploadButton.removeEventListener('click', handleFileUpload);
            setTimeout(function() {
              showCostumeOptions();
            }, TIMEOUT);
          });
        } else {
          // Show error message if file isn't an image
          const errorMessage = document.createElement('div');
          errorMessage.classList.add('message', 'chatbot');
          errorMessage.textContent = 'אופס קרתה תקלה. נא לוודא שהקובץ הוא תמונה ולנסות שוב.';
          conversation.appendChild(errorMessage);
          conversation.scrollTop = conversation.scrollHeight;
        }
      }
    console.log('end of showUploadButton');
});

  messageUploadButton.appendChild(uploadButton);
  conversation.appendChild(messageUploadButton);
  conversation.scrollTop = conversation.scrollHeight;
}

function initPage() {
    const messageHello = document.createElement('div');
    messageHello.classList.add('message', 'chatbot');
    messageHello.textContent = 'שלום לכם';
    conversation.appendChild(messageHello);
    conversation.scrollTop = conversation.scrollHeight;

  setTimeout(function() {

    const messageWhoAmI = document.createElement('div');
    messageWhoAmI.classList.add('message', 'chatbot');
    const messageWhoAmI1 = document.createElement('p');
    //const messageWhoAmI2 = document.createElement('p');
    messageWhoAmI1.textContent = 'אני בינה מלאכותית שמשתמשת בטכנולוגיה חדשנית כדי להראות לכם איך תראו בעתיד';
    //messageWhoAmI2.textContent = 'ואני אראה לכם איך תראו בעתיד';
    messageWhoAmI.appendChild(messageWhoAmI1);
    //messageWhoAmI.appendChild(messageWhoAmI2);
    conversation.appendChild(messageWhoAmI);
    conversation.scrollTop = conversation.scrollHeight;

    setTimeout(function () {

      const messageHowDoes = document.createElement('div');
      messageHowDoes.classList.add('message', 'chatbot');
      const messageHowDoes1 = document.createElement('p');
      //const messageHowDoes2 = document.createElement('p');
      messageHowDoes1.textContent = 'כדי שאוכל לעשות את זה אני צריכה שתעלו תמונת פנים שלכם'
      //messageHowDoes2.textContent = 'אל תש '
      messageHowDoes.appendChild(messageHowDoes1);
      //messageHowDoes.appendChild(messageHowDoes2);
      conversation.appendChild(messageHowDoes);
      conversation.scrollTop = conversation.scrollHeight;

      setTimeout(  function () {
        showUploadButton();
      }, TIMEOUT);
    }, TIMEOUT);
  }, TIMEOUT);
}

// Add this new function to compress images
function compressImage(file, callback) {
  const reader = new FileReader();
  reader.onload = function(event) {
    const img = new Image();
    img.onload = function() {
      // Create canvas to resize image
      const canvas = document.createElement('canvas');
      // Determine size - limit to max 800px width/height
      let width = img.width;
      let height = img.height;
      const maxSize = 800;
      
      if (width > height && width > maxSize) {
        height = (height / width) * maxSize;
        width = maxSize;
      } else if (height > maxSize) {
        width = (width / height) * maxSize;
        height = maxSize;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Draw and compress image
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      
      // Get reduced-size data URL (0.8 quality)
      const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
      callback(dataUrl);
    };
    
    img.onerror = function() {
      alert('אירעה שגיאה בטעינת התמונה. נא לנסות שוב.');
    };
    
    img.src = event.target.result;
  };
  
  reader.onerror = function() {
    alert('אירעה שגיאה בקריאת הקובץ. נא לנסות שוב.');
  };
  
  reader.readAsDataURL(file);
}

function handleFileUpload() {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  // Add capture attribute for better mobile camera handling
  fileInput.setAttribute('capture', 'user');
  fileInput.addEventListener('change', handleFileSelect);
  fileInput.click();
}

function showCostumeOptions() {
  console.log('showCostumeOptions start');


  const messageOkUpload = document.createElement('div');
  const messageBeforeCotumes = document.createElement('div');
  messageBeforeCotumes.classList.add('message', 'chatbot');
  messageOkUpload.classList.add('message', 'chatbot');

  messageOkUpload.textContent = 'מצויין, התמונה עלתה בהצלחה';

  console.log('counter before: '+counterTimes)

  setTimeout( function () {
    if (counterTimes==0) {
      counterTimes++;
      conversation.appendChild(messageOkUpload);
      conversation.scrollTop = conversation.scrollHeight;
      
      console.log('counter after: '+counterTimes)
      showImageResults();

    } else {
      counterTimes++;
      messageOkUpload.textContent = 'מגיע לכם. זה מה שקורה למי שמקשיב לבוטים באינטרנט'
      conversation.appendChild(messageOkUpload);
      conversation.scrollTop = conversation.scrollHeight;
    }
  }, TIMEOUT); // Beginning
}



// Code starts here
initPage();

