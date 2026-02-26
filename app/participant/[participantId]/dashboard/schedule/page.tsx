export default function SchedulePage() {
    return (
        <div className="space-y-8 animate-fade-in-up">
            <header>
                <h1 className="text-3xl font-bold text-white tracking-tight">Event Schedule</h1>
                <p className="text-gray-400 mt-1">Hackoverflow 4.0 Timeline</p>
            </header>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                <div className="space-y-8">
                    {/* Day 1 */}
                    <div>
                        <h2 className="text-[#FCB216] font-bold text-xl mb-6 flex items-center gap-3">
                            <span className="bg-[#FCB216]/10 p-2 rounded-lg">📅</span> Day 1 - Kickoff
                        </h2>
                        <div className="border-l-2 border-white/5 ml-4 pl-8 space-y-8">
                            <div className="relative">
                                <div className="absolute -left-[35px] top-0 w-3 h-3 bg-[#FCB216] rounded-full shadow-[0_0_10px_#FCB216]" />
                                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">09:00 AM</p>
                                <h3 className="text-white font-bold text-lg">Registration Begins</h3>
                                <p className="text-gray-400 text-sm">Check-in and collect your participation kits.</p>
                            </div>
                            <div className="relative">
                                <div className="absolute -left-[35px] top-0 w-3 h-3 bg-white/20 rounded-full" />
                                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">11:00 AM</p>
                                <h3 className="text-white font-bold text-lg">Opening Ceremony</h3>
                                <p className="text-gray-400 text-sm">Official start of Hackoverflow 4.0 at the main auditorium.</p>
                            </div>
                            <div className="relative">
                                <div className="absolute -left-[35px] top-0 w-3 h-3 bg-white/20 rounded-full" />
                                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">12:30 PM</p>
                                <h3 className="text-white font-bold text-lg">Hacking Begins</h3>
                                <p className="text-gray-400 text-sm">The clock starts now! Get to your labs and start building.</p>
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-white/5" />

                    {/* Day 2 */}
                    <div>
                        <h2 className="text-[#D91B57] font-bold text-xl mb-6 flex items-center gap-3">
                            <span className="bg-[#D91B57]/10 p-2 rounded-lg">🚀</span> Day 2 - Finale
                        </h2>
                        <div className="border-l-2 border-white/5 ml-4 pl-8 space-y-8">
                            <div className="relative">
                                <div className="absolute -left-[35px] top-0 w-3 h-3 bg-white/20 rounded-full" />
                                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">10:00 AM</p>
                                <h3 className="text-white font-bold text-lg">Mentorship Round</h3>
                                <p className="text-gray-400 text-sm">Industry experts will visit your labs for review.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
