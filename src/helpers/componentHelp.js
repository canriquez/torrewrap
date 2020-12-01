const blobToBase64 = blob => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise(resolve => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };


const hasVideoProfile = (url) =>{
  if (!url) return false
    if (url.includes('no_profile.mp4') || !url)
        return false
    return true
  }

  export {blobToBase64,hasVideoProfile}
