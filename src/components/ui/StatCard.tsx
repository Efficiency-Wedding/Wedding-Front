type StatCardProps = {
    number: string;
    label: string;
};

export default function StatCard({ number, label }: StatCardProps) {
    return (
        <div>
            <h3 className="text-3xl font-bold text-black">{number}</h3>
            <p className="text-black">{label}</p>
        </div>
    );
}