import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const Premium = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 w-full max-w-6xl mx-auto justify-center mt-10">
      {/* Silver Membership Card */}
      <Card className="flex-1 overflow-hidden border-2 hover:border-primary/50 transition-colors">
        <CardHeader className="bg-muted/50 p-6 text-center">
          <CardTitle className="text-3xl font-bold">SILVER</CardTitle>
          <CardDescription>Premium Membership</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <ul className="space-y-4 mb-6">
            <li className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-500" />
              Standard features access
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-500" />
              Priority support
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-500" />
              Monthly newsletter
            </li>
          </ul>

          <div className="text-center mb-6">
            <span className="text-4xl font-bold">$9.99</span>
            <span className="text-muted-foreground">/month</span>
          </div>

        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button className="w-full" size="lg">Pay Now</Button>
        </CardFooter>
      </Card>

      {/* Golden Membership Card */}
      <Card className="flex-1 overflow-hidden border-2 border-yellow-500/50 shadow-lg relative">
        <div className="absolute top-0 right-0 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
          POPULAR
        </div>
        <CardHeader className="bg-yellow-500/10 p-6 text-center">
          <CardTitle className="text-3xl font-bold text-yellow-600 dark:text-yellow-500">GOLDEN</CardTitle>
          <CardDescription className="text-yellow-600/80 dark:text-yellow-500/80">VIP Membership</CardDescription>
        </CardHeader>

        <CardContent className="p-6">
          <ul className="space-y-4 mb-6">
            <li className="flex items-center gap-2">
              <Check className="h-5 w-5 text-yellow-600" />
              All Silver features
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-5 w-5 text-yellow-600" />
              Exclusive content
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-5 w-5 text-yellow-600" />
              VIP events access
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-5 w-5 text-yellow-600" />
              24/7 Premium support
            </li>
          </ul>

          <div className="text-center mb-6">
            <span className="text-4xl font-bold text-yellow-600 dark:text-yellow-500">$19.99</span>
            <span className="text-muted-foreground">/month</span>
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white" size="lg">Pay Now</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Premium;
