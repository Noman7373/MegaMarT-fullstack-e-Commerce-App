const forgotOtpTamplete = (OTP) => {
  return `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2>Action Required: One-Time Verification Code</h2>
        <p>You are receiving this email because a request was made for a one-time code that can be used for authentication.</p>
        <hr/>
        <p>Please enter the following code for verification:</p>
  
        <div style="display: flex; justify-content: center; margin-top: 1rem;">
          <h2 style="padding: 0.5rem 1rem; background: #f4f4f4; border: 1px solid #ddd; border-radius: 5px; color: #111;">
            ${OTP}
          </h2>
        </div>
  
        <p>If you didn’t make this request, you can safely ignore this email.</p>
      </div>
    `;
};

export default forgotOtpTamplete;
