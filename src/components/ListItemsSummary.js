export default function ListItemSummary(props) {
    const { list } = props;

    return (
        <div className="items-summary-container">
             <div className="items-summary-row">
                <span>
                    {"1.    "}
                </span>
                <span>
                    {list.items[0]}
                </span>
            </div>
            {
                (list.itemVotes) ?
                <div className="items-summary-vote-row">
                    <span style={{fontSize: '10pt'}}>
                        {"(" + list.itemVotes[0] + " votes)"}
                    </span>
                </div> : ""
            }
            <div className="items-summary-row">
                <span>
                    {"2.    "}
                </span>
                <span>
                    {list.items[1]}
                </span>
            </div>
            {
                (list.itemVotes) ?
                <div className="items-summary-vote-row">
                    <span style={{fontSize: '10pt'}}>
                        {"(" + list.itemVotes[1] + " votes)"}
                    </span>
                </div> : ""
            }
            <div className="items-summary-row">
                <span>
                    {"3.    "}
                </span>
                <span>
                    {list.items[2]}
                </span>
            </div>
            {
                (list.itemVotes) ?
                <div className="items-summary-vote-row">
                    <span style={{fontSize: '10pt'}}>
                        {"(" + list.itemVotes[2] + " votes)"}
                    </span>
                </div> : ""
            }
            <div className="items-summary-row">
                <span>
                    {"4.    "}
                </span>
                <span>
                    {list.items[3]}
                </span>
            </div>
            {
                (list.itemVotes) ?
                <div className="items-summary-vote-row">
                    <span style={{fontSize: '10pt'}}>
                        {"(" + list.itemVotes[3] + " votes)"}
                    </span>
                </div> : ""
            }
            <div className="items-summary-row">
                <span>
                    {"5.    "}
                </span>
                <span>
                    {list.items[4]}
                </span>
            </div>
            {
                (list.itemVotes) ?
                <div className="items-summary-vote-row">
                    <span style={{fontSize: '10pt'}}>
                        {"(" + list.itemVotes[4] + " votes)"}
                    </span>
                </div> : ""
            }
        </div>
    )

}