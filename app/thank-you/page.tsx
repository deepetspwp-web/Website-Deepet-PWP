
import Link from 'next/link';
import { CheckCircle2, Home } from 'lucide-react';

export default function ThankYouPage() {
    return (
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
            <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 max-w-lg w-full overflow-hidden text-center p-10 md:p-14 relative">

                {/* Decorative background elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] right-[-5%] w-[300px] h-[300px] bg-[#003451]/5 rounded-full blur-[80px]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-[#bfe37f]/10 rounded-full blur-[80px]" />
                </div>

                <div className="relative z-10 flex flex-col items-center">
                    <div className="w-20 h-20 bg-[#bfe37f]/20 rounded-full flex items-center justify-center mb-8">
                        <CheckCircle2 className="w-10 h-10 text-[#7da342]" />
                    </div>

                    <h1 className="text-3xl md:text-4xl font-serif font-medium text-[#003451] mb-4">
                        Thank You!
                    </h1>

                    <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                        Your request has been received successfully. <br />
                        Our team will contact you shortly to confirm the details.
                    </p>

                    <div className="space-y-4 w-full">
                        <Link
                            href="/"
                            className="w-full group bg-[#003451] hover:bg-[#00283d] text-white text-lg font-bold py-4 rounded-xl shadow-xl shadow-[#003451]/20 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
                        >
                            <Home className="w-5 h-5" />
                            <span>Back to Home</span>
                        </Link>

                        <p className="text-xs text-gray-400 mt-6">
                            Need immediate assistance? Call us at <a href="tel:+919876543210" className="text-[#003451] font-semibold hover:underline">Support</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
