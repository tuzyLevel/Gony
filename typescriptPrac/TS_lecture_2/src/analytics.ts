let logged;

function sendAnalytics(data: any) {
  console.log(data);
  logged = true;
}

sendAnalytics("The data");
