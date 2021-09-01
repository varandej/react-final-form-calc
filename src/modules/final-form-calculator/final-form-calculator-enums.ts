
/**
 * Енам полей калькулятора
 */
export enum EFinalFormCalculatorFields {
  Amount = 'amount',
  IsInsuredInBank = 'isInsuredInBank',
  IsSalary = 'isSalary',
  MonthlyPayment = 'monthlyPayment',
  Overpayment = 'overpayment',
  PaymentType = 'paymentType',
  Product = 'product',
  Rate = 'rate',
  TermInMonths = 'termInMonths',
  TotalAmount = 'totalAmount',
};

/**
 * Енам служебных полей калькулятора
 */
export enum EFinalFormAdditionalCalculatorFields {
  AnnuityMonthlyPayment = 'annuityMonthlyPayment',
  AnnuityOverpayment = 'annuityOverpayment',
  DifferentiatedMonthlyPayment = 'differentiatedMonthlyPayment',
  DiffernetioatedOverpayment = 'differentiatedOverpayment',
  InsuranceRateMod = 'blablalba343',
  MonthlyRateCoefficient = 'monthlyRateCoefficient',
  SalaryRateMod = 'salaryMod',
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
};
