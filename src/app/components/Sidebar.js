import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[200px] h-[calc(100vh-20px)] p-1 shadow-lg ml-2 bg-primary">
        <CardHeader className="flex gap-3">
          <Image
            alt="nextui logo"
            height={40}
            radius="sm"
            src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-md text-lightText">BudgetNav</p>
            <p className="text-small text-lightText">Find your Finances</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="mt-2">
          {/* List of Links */}
          <nav className="flex flex-col space-y-4 text-ce">
            <Link href="/dashboard" className="text-lightText hover:text-accent">
              Home
            </Link>
            <Link href="/dashboard/transactions" className="text-lightText hover:text-accent">
              Transactions
            </Link>
            <Link href="/dashboard/budget" className="text-lightText hover:text-accent">
              Budget
            </Link>
            <Link href="/dashboard/sliders" className="text-lightText hover:text-accent">
              Sliders
            </Link>
            <Link href="/dashboard/expenses" className="text-lightText hover:text-accent">
              Expenses
            </Link>
          </nav>
        </CardBody>
        <Divider />
        <CardFooter>
          <p>Footer content here</p>
        </CardFooter>
      </Card>
    </div>
  );
}
