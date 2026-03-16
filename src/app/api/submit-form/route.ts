import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const sheetUrl = process.env.FORM_SHEET_URL;
        if (!sheetUrl) {
            return NextResponse.json({ error: 'Sheet URL not configured' }, { status: 500 });
        }

        const response = await fetch(sheetUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`Apps Script responded with ${response.status}`);
        }

        // Send WhatsApp Notification via CallMeBot
        const whatsappPhone = process.env.CALLMEBOT_PHONE;
        const whatsappApikey = process.env.CALLMEBOT_API_KEY;

        if (whatsappPhone && whatsappApikey && whatsappApikey !== 'YOUR_API_KEY') {
            try {
                const name = body.name || (body.firstName ? `${body.firstName} ${body.lastName || ''}`.trim() : 'N/A');
                const message = `🚀 *New Lead from Xerebo!*
                
👤 *Name:* ${name}
📧 *Email:* ${body.email || 'N/A'}
📱 *Phone:* ${body.phone || body.mobile || 'N/A'}
🏢 *Company:* ${body.company || 'N/A'}
� *Budget:* ${body.budget || 'N/A'}
📊 *Type:* ${body.formType || 'Contact Form'}${body.competitorUrl ? `\n🌐 *URL:* ${body.competitorUrl}` : ''}${body.question ? `\n❓ *Q:* ${body.question}` : ''}`;

                const encodedMessage = encodeURIComponent(message);
                const whatsappUrl = `https://api.callmebot.com/whatsapp.php?phone=${whatsappPhone}&text=${encodedMessage}&apikey=${whatsappApikey}`;

                // Fire and forget (don't wait for it to finish to respond to user)
                fetch(whatsappUrl).catch(err => console.error('WhatsApp notification failed:', err));
            } catch (notifyError) {
                console.error('Error preparing WhatsApp notification:', notifyError);
            }
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Form submission error:', error);
        return NextResponse.json({ error: 'Failed to submit form' }, { status: 500 });
    }
}
