import Card from "./Card";
import MatchInfo from "./MatchInfo";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <Card />
      <MatchInfo />
    </main>
  )
}
