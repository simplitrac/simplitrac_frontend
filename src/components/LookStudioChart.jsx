import React from "react";

const LookerStudioChart = ({ userId }) => {
    const reportUrl = `https://lookerstudio.google.com/embed/reporting/1bf3befc-bd02-43b9-a217-cd1f35ddda0a/page/EO64D?user_id=${userId}`;

    return (
        <div className="report-container">
            <iframe
                id="report-frame"
                width="600"
                height="400"
                src={reportUrl}
                style={{ border: 0 }}
                allowFullScreen
            />
        </div>
    );
};

export default Look