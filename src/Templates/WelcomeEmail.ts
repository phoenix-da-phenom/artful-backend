export function welcomeEmailTemplate(name: string){
    return `
    <div style="font-family: Arial, sans-serif; padding:20px;">
      <h2 style="color:#4f46e5;">Welcome, ${name} 👋</h2>
      <p>We’re excited to have you join us.</p>
      <p>If you have any questions, feel free to reply.</p>
      <hr />
      <small>© 2026 Your App</small>
    </div>`
  
}