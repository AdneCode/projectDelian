export const Box = (p: { id: number; lives?: number }) => {
    const { id, lives } = p;
    return (
        <div className="m-4 p-4 w-32 h-32 border border-y-4 border-sky-500">
            {lives ? lives : id}
        </div>
    );
};
