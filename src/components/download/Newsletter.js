import React from "react";
import { useQueryParamString } from "react-use-query-param-string";


export const Newsletter = {
    "no": "no",
    "subscribed": "subscribed",
    "skipped": "skipped",
}

export default function SelectNewsletter() {
    const [version, setVersion] = useQueryParamString('version');
    const [os, setOS] = useQueryParamString('os');
    const [arch, setArch] = useQueryParamString('arch')
    const [donated, setDonated] = useQueryParamString('donated');
    const [newsletter, setNewsletter] = useQueryParamString('newsletter', Newsletter.no);

    if (!version || !os || !arch || !donated) return null;

    return (
        <div>
            Newsletter
            <input type="email" placeholder="Enter your email" />
            <button onClick={() => setNewsletter(Newsletter.subscribed)}>Subscribe</button>
            <p>We will send you a newsletter every month with the latest updates.</p>
            <p onClick={() => setNewsletter(Newsletter.skipped)}>skip</p>
        </div>
    )
}