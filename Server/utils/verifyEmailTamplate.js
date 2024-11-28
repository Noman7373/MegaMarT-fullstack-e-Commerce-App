const verifyEmailTemplate = ({ name, url }) => {
  return `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2>Hello ${name},</h2>
        <p>Thank you for registering. Please verify your email by clicking the button below:</p>
        <a 
          href="${url}" 
          style="
            display: inline-block; 
            padding: 0.75rem 1.5rem; 
            color: #fff; 
            background-color: #000; 
            text-decoration: none; 
            border-radius: 5px; 
            font-size: 1rem;
          "
        >
          Verify Email
        </a>
        <p>If you didn’t sign up, you can safely ignore this email.</p>
      </div>
    `;
};

export default verifyEmailTemplate;
