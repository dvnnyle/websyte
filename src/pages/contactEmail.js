<div style="font-family: 'Godfried', system-ui, sans-serif, Arial; font-size: 12px; max-width: 600px; margin: 0 auto; background-color: #1a1a1a; color: #e9e9e9;">
  <div style="padding: 20px; background-color: #0f0f0f; color: #e9e9e9; text-align: center; border-bottom: 1px solid rgba(233, 233, 233, 0.1);">
    <h2 style="margin: 0; font-size: 20px; font-weight: 600; text-shadow: 0 0 10px rgba(233, 233, 233, 0.3);">New Contact Form Message</h2>
    <p style="margin: 10px 0 0 0; opacity: 0.7; color: #e9e9e9;">A message from dvnny.no has been received</p>
  </div>
  
  <div style="padding: 30px 20px; background-color: #1a1a1a;">
    <div
      style="
        margin-bottom: 25px;
        padding: 20px;
        border-left: 4px solid rgba(233, 233, 233, 0.6);
        background-color: rgba(233, 233, 233, 0.05);
        border-radius: 8px;
        border: 1px solid rgba(233, 233, 233, 0.1);
      "
    >
      <div style="margin-bottom: 8px;">
        <strong style="color: #e9e9e9; font-size: 18px; text-shadow: 0 0 5px rgba(233, 233, 233, 0.2);">{{from_name}}</strong>
      </div>
      <div style="color: rgba(233, 233, 233, 0.8); font-size: 14px; margin-bottom: 4px;">
        {{from_email}}
      </div>
      <div style="color: rgba(233, 233, 233, 0.6); font-size: 12px;">
        Received on {{date}} at {{time}}
      </div>
    </div>

    <div style="margin-bottom: 25px;">
      <h3 style="color: #e9e9e9; font-size: 16px; margin-bottom: 12px; border-bottom: 1px solid rgba(233, 233, 233, 0.2); padding-bottom: 8px; text-shadow: 0 0 5px rgba(233, 233, 233, 0.2);">
        Message:
      </h3>
      <div 
        style="
          background-color: rgba(233, 233, 233, 0.05);
          padding: 20px;
          border-radius: 8px;
          border: 1px solid rgba(233, 233, 233, 0.2);
          line-height: 1.6;
          font-size: 15px;
          color: #e9e9e9;
          white-space: pre-wrap;
        "
      >{{message}}</div>
    </div>

    <div 
      style="
        padding: 15px;
        background-color: rgba(233, 233, 233, 0.03);
        border-radius: 8px;
        border-left: 4px solid rgba(233, 233, 233, 0.6);
        border: 1px solid rgba(233, 233, 233, 0.1);
        margin-top: 20px;
      "
    >
      <p style="margin: 0; color: rgba(233, 233, 233, 0.8); font-size: 13px;">
        <strong style="color: #e9e9e9;">Quick Reply:</strong> Simply reply to this email to respond directly to {{from_name}} at {{from_email}}
      </p>
    </div>
  </div>
  
  <div style="padding: 15px 20px; background-color: #0f0f0f; text-align: center; border-top: 1px solid rgba(233, 233, 233, 0.1);">
    <p style="margin: 0; color: rgba(233, 233, 233, 0.5); font-size: 11px;">
      This message was sent from your website contact form at dvnny.no
    </p>
  </div>
</div>
