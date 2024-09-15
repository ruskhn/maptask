<template>
  <div>
    <div class="space-y-6">
      <section class="space-y-3">
        <h3 class="text-lg font-medium">Active plan</h3>

        <Card>
          <CardHeader
            class="flex flex-row items-center justify-between pb-2 space-y-0"
          >
            <CardTitle class="text-2xl font-bold"> Free </CardTitle>
          </CardHeader>
          <CardContent>
            <div class="text-sm font-medium">
              For organizing every corner of your work and life
            </div>
            <p class="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
      </section>

      <section class="space-y-6">
        <div class="py-6">
          <h3 class="text-lg font-medium">Billing</h3>

          <p class="text-sm text-muted-foreground">
            Need help deciding which plan is best for your workspace? Contact
            sales
          </p>
        </div>
        <Separator />

        <div class="flex justify-between gap-6">
          <Card class="w-full overflow-hidden">
            <div class="h-[150px]">
              <CardHeader class="p-4">
                <div class="font-medium">Free</div>
                <p class="text-xs">$0 per member</p>
              </CardHeader>
            </div>
            <div class="bg-muted h-[175px]">
              <CardContent class="p-4 text-xs">
                <ul>
                  <li>· 30MB uploaded files</li>
                  <li>· Up to 5 categories</li>
                  <li>· E-mail support</li>
                </ul>
              </CardContent>
            </div>
          </Card>

          <Card class="w-full overflow-hidden">
            <div class="h-[150px]">
              <CardHeader class="p-4">
                <div class="flex items-center gap-2">
                  Team
                  <Badge class="w-fit bg-[#EAAEF9]">Popular</Badge>
                </div>
                <p class="text-xs">
                  $100 per team / 12 months <br />
                  or $15 per team / month
                </p>
                <Button class="mt-4 text-xs w-fit" size="xs">Upgrade</Button>
              </CardHeader>
            </div>
            <div class="bg-muted h-[175px]">
              <CardContent class="p-4 text-xs">
                All features of the free plan, plus:
                <ul>
                  <li>· Command space</li>
                  <li>· Up to 10 people</li>
                  <li>· Up to 10 categories</li>
                  <li>· 5GB uploaded files</li>
                  <li>· Full dashboard</li>
                </ul>
              </CardContent>
            </div>
          </Card>

          <Card class="w-full overflow-hidden">
            <div class="h-[150px]">
              <CardHeader class="p-4">
                <div class="flex items-center gap-2">SuperTeam</div>
                <p class="text-xs">
                  200 per project / 12 months <br />
                  or $30 per team / month
                </p>
                <Button class="mt-4 text-xs w-fit" size="xs" variant="outline"
                  >Upgrade</Button
                >
              </CardHeader>
            </div>
            <div class="bg-muted h-[175px]">
              <CardContent class="p-4 text-xs">
                All Team functions, plus:
                <ul>
                  <li>· Unlimited people</li>
                  <li>· Unlimited categories</li>
                  <li>· 10GB uploaded files</li>
                  <li>· Monitoring the location of the team</li>
                </ul>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      <Card>
        <CardHeader
          class="flex flex-row items-center justify-between pb-2 space-y-0"
        >
          <CardTitle class="text-2xl font-bold"> Individual plan </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="text-sm font-medium">
            We are ready to offer a customized solution for your business.
            Contact us to discuss your unique requirements.
          </div>
          <p class="text-xs text-muted-foreground">sale@ruslan.guru</p>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
