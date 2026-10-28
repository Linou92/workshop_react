
import { useState } from "react";
import { ArrowRight } from "lucide-react";

function Newsletter() {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (email.trim()) {
            setSubscribed(true);
        }
    }

    return (
        <section
            id="newsletter"
            className="bg-gray-900 px-4 py-12 text-white sm:px-6 lg:px-8"
        >
            <div className="mx-auto grid max-w-7xl items-center gap-8 md:grid-cols-2">
                <div>
                    <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-gray-400">
                        Stay in the loop
                    </p>

                    <h2 className="text-2xl font-bold sm:text-3xl">
                        Get updates from LITE.SHOP
                    </h2>

                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-gray-300">
                        Subscribe to hear about new arrivals, special offers, and
                        selected products.
                    </p>
                </div>

                <div>
                    {subscribed ? (
                        <p className="rounded-lg bg-white/10 p-4 text-sm">
                            Thank you! Your email has been entered.
                        </p>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-3 sm:flex-row"
                        >
                            <label htmlFor="newsletter-email" className="sr-only">
                                Email address
                            </label>

                            <input
                                id="newsletter-email"
                                type="email"
                                required
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="Enter your email address"
                                className="min-w-0 flex-1 rounded-lg border border-gray-600 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-300"
                            />

                            <button
                                type="submit"
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-200"
                            >
                                Subscribe
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </form>
                    )}

                    <p className="mt-3 text-xs text-gray-400">
                        You can unsubscribe at any time.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Newsletter;
