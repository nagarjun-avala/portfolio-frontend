"use client"
import { ArrowRight, ArrowUpRight, Github, Linkedin, Phone, Terminal, Twitter } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { api } from "@/lib/fetchApi";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Turnstile } from '@marsidev/react-turnstile';

// Component: Local Time Display
const LocalTime = () => {
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString('en-US', { hour12: false }) + " " + (now.toLocaleTimeString('en-us', { timeZoneName: 'short' }).split(' ')[2] || ''));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return <span className="font-mono text-slate-500 dark:text-slate-400">{time}</span>;
};

// Combined Contact & Footer (Mega Footer)
import { Social } from "@/lib/types";

export const ContactAndFooter = ({ email, name, phone, socials }: { email: string, name: string, phone: string | undefined, socials?: Social[] }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [token, setToken] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.email || !formData.message) {
            toast.error("Please fill in all fields");
            return;
        }

        if (!token) {
            toast.error("Please explicitly solve the Captcha.");
            return;
        }

        setIsSubmitting(true);
        try {
            await api.post("/contact", { ...formData, 'cf-turnstile-response': token });
            toast.success("Message sent successfully!");
            setFormData({ name: "", email: "", message: "" });
            setToken("");
        } catch (error: unknown) {
            console.error("Submission error:", error);
            toast.error((error as Error).message || "Failed to send message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const getIcon = (platform: string) => {
        const p = platform.toLowerCase();
        if (p.includes("github")) return <Github className="w-5 h-5" />;
        if (p.includes("twitter") || p.includes("x")) return <Twitter className="w-5 h-5" />;
        if (p.includes("linkedin")) return <Linkedin className="w-5 h-5" />;
        return <ArrowUpRight className="w-5 h-5" />;
    }

    return (
        <footer id="connect" className="bg-slate-50 dark:bg-slate-950 pt-32 pb-12 border-t border-slate-200 dark:border-slate-900 scroll-mt-24">
            <div className="max-w-7xl mx-auto px-4">

                {/* Hero CTA & Form Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
                    {/* Left: CTA */}
                    <div className="flex flex-col justify-center text-center lg:text-left">
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight leading-tight">
                            Let's build <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-rose-500 to-purple-600 dark:from-rose-400 dark:to-purple-500">something epic.</span>
                        </h2>
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <Button size="lg" className="text-xl h-auto py-4 px-8 rounded-full" asChild>
                                <a href={`mailto:${email}`}>
                                    {email} <ArrowUpRight className="ml-2" size={24} />
                                </a>
                            </Button>
                            {phone && (
                                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-lg">
                                    <Phone size={20} /> {phone}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: Contact Form */}
                    <div>
                        <Card className="border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 py-6 px-4">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold capitalize">Send a Message</CardTitle>
                                <CardDescription>Got a project in mind? Let's talk.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Name</label>
                                        <Input
                                            name="name"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={handleChange}
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Email</label>
                                        <Input
                                            name="email"
                                            placeholder="john@example.com"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Message</label>
                                    <Textarea
                                        name="message"
                                        placeholder="Tell me about your project..."
                                        className="min-h-37.5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <div className="py-2">
                                    <Turnstile 
                                        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"} // Testing keys
                                        onSuccess={(token) => setToken(token)}
                                        options={{ theme: 'auto' }}
                                    />
                                </div>
                                <Button
                                    className="w-full font-bold h-12 text-md"
                                    onClick={handleSubmit}
                                    disabled={isSubmitting || !token}
                                >
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Links Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20 border-t border-slate-200 dark:border-slate-900 pt-16">
                    <div className="col-span-2 md:col-span-1">
                        <h3 className="text-slate-900 dark:text-white font-bold text-xl mb-6 flex items-center gap-2">
                            <Terminal className="text-rose-500" /> {name}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-500 leading-relaxed mb-6">
                            Crafting digital experiences with code and creative design. Based in the Cloud.
                        </p>
                        <div className="flex gap-4">
                            {socials && socials.map((social) => (
                                <Button key={social.platform} variant="ghost" size="icon" className="rounded-full hover:bg-slate-200 dark:hover:bg-slate-800" asChild>
                                    <a href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.platform}>
                                        {getIcon(social.platform)}
                                    </a>
                                </Button>
                            ))}
                            {!socials && (
                                <>
                                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-200 dark:hover:bg-slate-800"><Github className="w-5 h-5" /></Button>
                                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-200 dark:hover:bg-slate-800"><Twitter className="w-5 h-5" /></Button>
                                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-200 dark:hover:bg-slate-800"><Linkedin className="w-5 h-5" /></Button>
                                </>
                            )}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-slate-900 dark:text-slate-300 font-bold mb-6">Sitemap</h4>
                        <ul className="space-y-4 text-slate-600 dark:text-slate-500">
                            <li><a href="#hero" className="hover:text-rose-500 dark:hover:text-rose-400 transition-colors">Home</a></li>
                            <li><a href="#work" className="hover:text-rose-500 dark:hover:text-rose-400 transition-colors">Work</a></li>
                            <li><a href="#profile" className="hover:text-rose-500 dark:hover:text-rose-400 transition-colors">About</a></li>
                            <li><a href="#blogs" className="hover:text-rose-500 dark:hover:text-rose-400 transition-colors">Writing</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-slate-900 dark:text-slate-300 font-bold mb-6">Services</h4>
                        <ul className="space-y-4 text-slate-600 dark:text-slate-500">
                            <li>Web Development</li>
                            <li>DevOps & CI/CD</li>
                            <li>UI/UX Design</li>
                            <li>Performance Optimization</li>
                        </ul>
                    </div>

                    <div className="col-span-2 md:col-span-1">
                        <h4 className="text-slate-900 dark:text-slate-300 font-bold mb-6">Newsletter</h4>
                        <p className="text-slate-600 dark:text-slate-500 text-sm mb-4">Subscribe for latest updates.</p>
                        <div className="flex gap-2">
                            <Input placeholder="Email address" className="bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800" />
                            <Button variant="default" size="icon" className="shrink-0"><ArrowRight className="w-4 h-4" /></Button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center text-slate-600 dark:text-slate-500 text-sm pt-8 border-t border-slate-200 dark:border-slate-900">
                    <div className="flex items-center gap-4">
                        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
                        <span className="hidden md:inline text-slate-400 dark:text-slate-800">|</span>
                        <LocalTime />
                    </div>
                    <div className="flex gap-2 items-center mt-4 md:mt-0">
                        <span>Built with React, Tailwind, Framer Motion & Shadcn/UI</span>
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    </div>
                </div>
            </div>
        </footer>
    );
};