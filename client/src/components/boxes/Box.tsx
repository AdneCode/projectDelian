export const Box = (p: { id: number }) => {
    const { id } = p;
    return (
        <div className="m-4 p-4 w-32 h-32 border border-y-4 border-sky-500">
            {id}
        </div>
    );
};
