import React, { useEffect } from "react"
import { useQueryParamString } from 'react-use-query-param-string';

export const Interval = {
    monthly: 'm',
    once: "o",
    yearly: 'y',
}

export const Donated = {
    no: "no",
    maybe: 'maybe',
    skipped: 'skipped',
}


export default function SelectDonation() {
    useEffect(() => {
        const body = document.querySelector('body')
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://donorbox.org/install-popup-button.js';
        script.id = 'donorbox-popup-button-installer';
        script.defer = true;
        body.appendChild(script);
    }, [])

    const [version, setVersion] = useQueryParamString('version');
    const [os, setOS] = useQueryParamString('os');
    const [arch, setArch] = useQueryParamString('arch')

    const [interval, setInterval] = useQueryParamString('interval', Interval.monthly);
    const [amount, setAmount] = useQueryParamString('amount', 25);

    const [donated, setDonated] = useQueryParamString('donated', Donated.no);

    const suggestions = interval === Interval.monthly
        ? [5, 10, 20, 25, 50, 100, 500]
        : [10, 25, 50, 100, 200, 300, 500];


    useEffect(() => {
        // listen for postMessage from donorbox
        const handleMessage = (event) => {
            console.log(event);
            if (event.origin !== "https://donorbox.org") return;
            const data = event.data;
            if (data.from === "dbox" && data.close) {
                setDonated(Donated.maybe);
            }
        }
        window.addEventListener("message", handleMessage);
        return () => {
            window.removeEventListener("message", handleMessage);
        }
    }, [])


    if (!version || !os || !arch) return null;
    const params = new URLSearchParams();
    params.append("amount", amount);
    params.append("hide_donation_meter", "true");
    params.append("default_interval", interval);
    const origin = window.location.origin;
    params.append("utm_content", JSON.stringify({ origin, version, os, arch }));
    params.append("utm_source", window.location.hostname);
    params.append("utm_medium", "banner");
    params.append("utm_campaign", "donation_banner");

    return (
        <>
            <h2>Donate</h2>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: "center" }}>
                <h3 onClick={() => setInterval(Interval.monthly)}>Monthly</h3>
                <h3 onClick={() => setInterval(Interval.once)}>One Time</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: "center" }}>
                {suggestions.map((suggestion, index) => {
                    return (
                        <div key={index} onClick={() => setAmount(suggestion)} style={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: "center" }}>
                            <h3>${suggestion}</h3>
                        </div>
                    )
                })}
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: "center" }}>
                <a
                    href={`https://donorbox.org/support-the-processing-foundation?${params.toString()}`}
                    class="dbox-donation-button"
                    target="_blank"
                >
                    <h3>Donate</h3>
                </a>
                <h4 onClick={() => setDonated(Donated.skipped)}>Just Download</h4>
            </div>
        </>
    )
}