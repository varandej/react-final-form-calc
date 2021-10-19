
/**
 * Енам полей калькулятора
 */
export enum EFinalFormCalculatorFields {
  Amount = 'amount',
  AverageIncome = 'averageIncome',
  EstateArea = 'estateArea',
  EstateCost = 'estateCost',
  EstateRegionId = 'estateRegionId',
  EstateTypeId = 'estateTypeId',
  InitialFee = 'initialFee',
  IsInsuredInBank = 'isInsuredInBank',
  IsSalary = 'isSalary',
  IsWithChildren = 'isWithChildren',
  IsWithSupport = 'isWithSupport',
  MarketTypeId = 'marketTypeId',
  MonthlyPayment = 'monthlyPayment',
  Overpayment = 'overpayment',
  PaymentType = 'paymentType',
  Product = 'product',
  Rate = 'rate',
  RepaymentPercentage = 'repaymentPercentage',
  TermInMonths = 'termInMonths',
  TotalAmount = 'totalAmount',
};

/**
 * Енам служебных полей калькулятора
 */
export enum EFinalFormAdditionalCalculatorFields {
  AnnuityAmount = 'annuityAmount',
  AnnuityMonthlyPayment = 'annuityMonthlyPayment',
  AnnuityOverpayment = 'annuityOverpayment',
  ChildrenRateMod = 'childrenRateMod',
  DifferentiatedAmount = 'differentiatedAmount',
  DifferentiatedMonthlyPayment = 'differentiatedMonthlyPayment',
  DiffernetioatedOverpayment = 'differentiatedOverpayment',
  InsuranceRateMod = 'blablalba343',
  MaxAmount = 'maxAmount',
  MaxTermInMonths = 'maxTermInMonths',
  MinAmount = 'minAmount',
  MinTermInMonths = 'minTermInMonths',
  MonthlyRateCoefficient = 'monthlyRateCoefficient',
  RepaymentSum = 'repaymentSum',
  SalaryRateMod = 'salaryMod',
  SupportRateMod = 'supportRateMod',
  YearlyRateCoefficient = 'yearlyRateCoefficient',
};

/**
 * Енам полей продукта
 */
export enum EFinalFormProductFields {
  BaseRate = 'product.baseRate',
  Id = 'product.id',
  InsuranceRateMod = 'product.insuranceRateMod',
  MaxAmount = 'product.maxAmount',
  MaxTermInMonths = 'product.maxTermInMonths',
  MinAmount = 'product.minAmount',
  MinTermInMonths = 'product.minTermInMonths',
  Name = 'product.name',
  SalaryRateMod = 'product.salaryRateMod',
};

/**
 * Енам типов платежа
 */
export enum EPayemntType {
  Annuity = 'annuity',
  Differentiated = 'differentiated',
};

/**
 * Енам типов доступных калькуляторов
 */
export enum ECalcTypes {
  Primitive = 'primitive',
  LoanBySum = 'loanBySum',
  LoanByIncome = 'loanByIncome',
  Mortgage = 'mortgage',
};

/**
 * Енап полей внешних данных передаваемых в скоуп eval
 */
export enum EFinalFormExternalScopeFields {
  EstateRegionDict = 'estateRegionDict',
  EstateTypeDict = 'estateTypeDict',
  MarketTypeDict = 'marketTypeDict',
};
