 
 export default function CheckExtensionType(ext) {
    
    let imgExt=["jpeg", "jpg", "png",  "gif"]
    let videoExt=["mp4","m4p","m4v","avi","mov","mpeg4"]

     let type="";

            const chk1=imgExt.indexOf(ext.toLowerCase());
            if(chk1>-1){
                type="image"
            }else{
                const chk2=videoExt.indexOf(ext.toLowerCase());
                if(chk2>-1){
                    type="video"
                }else{
                    type=""
                }
            }
        
      

    return type ;
 }