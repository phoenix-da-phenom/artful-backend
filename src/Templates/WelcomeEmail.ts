export function welcomeEmailTemplate(name: string, url:string){
    return `
    <div style="font-family: Arial, sans-serif; padding:20px;">
      <h2 style="color:#4f46e5;">Welcome, ${name} 👋</h2>
      <p>We’re excited to have you join us.</p>
      <p>If you have any questions, feel free to reply.</p>
      <a href="http://localhost:8000/verification?token=${url}">Verify here</a>
      <hr />
      <small>© 2026 Artful studio</small>
    </div>`
  
}