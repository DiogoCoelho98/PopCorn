export default function PopCornMain({ children, query }) {
  const boxStyle = query?.length > 2 ?  {height: "fit-content"} : {}; 


    return (
      <>
        <main className="main" style={boxStyle}>{children}</main>
      </>
    )
}