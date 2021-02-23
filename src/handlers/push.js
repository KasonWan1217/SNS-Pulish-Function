
const aws =  require("aws-sdk");
const sns = new aws.SNS({
   region:'ap-northeast-1'
});
exports.snsPulishHandler = function(event, context, callback) {
   console.log("AWS lambda and SNS trigger ");
   console.log(event);
   var payload = {
      default: "Sample fallback message",
      APNS: {
         aps: {
            alert:{
               type:"N",
               title:"Title - Demo",
               body:"This is Body",
               sound:"default",
               badge:1, 
               picture_url:"https://www.hkbea.com/images/logo.gif"
            }
         }
      },
      APNS_SANDBOX: {
         aps: {
            alert:{
               type:"N",
               title:"Title - Demo",
               body:"This is Body",
               sound:"default",
               badge:1, 
               picture_url:"https://www.hkbea.com/images/logo.gif"
            }
         }
      },
      GCM: {
            data: {
                type:"N",
                title:"Title - Demo",
                body:"This is Body",
                sound:"default",
                badge:1, 
                picture_url:"https://www.hkbea.com/images/logo.gif"
            }
      }
   };
   payload.APNS_SANDBOX = JSON.stringify(payload.APNS_SANDBOX);
   payload.APNS = JSON.stringify(payload.APNS);
   payload.GCM = JSON.stringify(payload.GCM);
   payload = JSON.stringify(payload);
   sns.publish({
       TopicArn: 'arn:aws:sns:ap-northeast-1:307834178100:MPF',
       MessageStructure: 'json',
       Message: payload
      
   }, function (err, data) {
      if (err) {
         console.log(err);
         callback(err, null);
      } else {
         console.log(data);
         callback(null, data);
      }	
   });
};