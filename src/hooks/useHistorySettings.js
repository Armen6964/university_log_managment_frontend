import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function useHistorySettings (initialSettings) {

    const [settings, setSettings] = useState(initialSettings);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {

        let query = searchParams.get("query");

        if (query && query != JSON.stringify(settings)) {

            try {

                query = JSON.parse(query);

                setSettings(query);

            } catch (e) {

            }

        }

    }, []);

    useEffect(() => {

        setSearchParams({ query: JSON.stringify(settings) });

    }, [settings]);

    return [settings, setSettings];

}