"use client";

const FAQS = [
    {
        q: "What is dog walking services?",
        a: "A dog walking is something that is important such as their food and grooming. When you book a dog walking near me services, the professional take your pet for a walk or play."
    },
    {
        q: "What are dog walking charges?",
        a: "Our dog walking plans start from ₹3500 per month. We offer various plans tailored to your needs, including 30-minute and 60-minute walk sessions."
    },
    {
        q: "What should you consider while looking for Dog walker?",
        a: "Consider experience, background verification, reliability, and the ability to provide real-time updates like GPS tracking and photos during the walk."
    },
    {
        q: "How to book dog walking Delhi?",
        a: "Booking is easy through our website. Just fill out the reservation form, choose your preferred time, and our expert team will handle the rest."
    },
    {
        q: "What are dog walking benefits?",
        a: "Proper exercise, mental stimulation, social interaction, and improved cardiovascular health are some of the key benefits of regular dog walking."
    }
];

export function DogWalkingIntro() {
    return (
        <section className="py-20 bg-[#f8fafc]">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col lg:flex-row gap-16">
                    <div className="lg:w-1/2 space-y-6">
                        <h2 className="text-3xl md:text-4xl font-serif text-[#003451] font-bold leading-tight">
                            Dog Walking Services - Book Dog Walker Near Me
                        </h2>
                        <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                            <p>
                                You share some special bonding with them when you give them dedicated time such as walking. But there are times when you can&apos;t find time for their walk session. We understand there can be any emergency, urgent work or anything. This is when DeePet dog walking Gurgaon helps you for the same.
                            </p>
                            <p>
                                It&apos;s really easy to book the walking session at your fingertips. Our team has professionals who will visit you and take your dog to refreshing and fun walk.
                            </p>
                            <p>
                                In this world full of chaos you found a partner for your thick and thin times which is your pet. Similarly your pet find their world within you. Like any other loved ones they also want your time and attention and it&apos;s not possible for all the time, don&apos;t worry you can get help from expert dog walker for this and rest assured.
                            </p>
                        </div>
                    </div>

                    <div className="lg:w-1/2">
                        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
                            <h3 className="text-2xl font-serif text-[#003451] font-bold mb-8">Frequently Asked Questions</h3>
                            <div className="space-y-8">
                                {FAQS.map((faq, idx) => (
                                    <div key={idx} className="space-y-2">
                                        <h4 className="text-[#3893c5] font-bold flex gap-2">
                                            <span className="text-[#bfe37f]">Q{idx + 1}-</span> {faq.q}
                                        </h4>
                                        <p className="text-gray-500 pl-8 leading-relaxed">
                                            <span className="font-semibold text-gray-700">Ans-</span> {faq.a}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
