
import "./cardContainer.scss"
export const CardContainer: React.FC<{ header: string; children: React.ReactNode }> = ({ header, children }) => {
    return (
        <div className="card-container">
            <div className="card-header">{header}</div>
            {children}
        </div>
    );
};