const EmailComp = (name: string, selectedService: string, message: string,  email: string) =>
    `<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title></title>
  </head>
  <body>
  <div style=" max-width: 600px; min-width:none; width: auto; margin: 0 auto;  box-sizing: border-box;font-family:sans-serif">
      
      <div style="padding:30px 30px; background: #f8fafb;">
          <p style="color: #00314D;">Hi Social media Express </p> 
          <p style="line-height: 180%;text-indent: 50px; text-align: justify; color: #00314D;"> I am ${name}. my email is : ${email} I would like to request a services which is <span style="text:bold" >${selectedService}</span>.
          <br></br>
          ${message}</p>
      </div>
    
  </div>
</body>
</html>`

export { EmailComp }

