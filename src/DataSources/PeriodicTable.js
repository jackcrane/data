import PeriodicTable from "./static/PeriodicTable.json";

const PeriodicTableDataSource = (inputValues) => {
  // Input values could be symbol, name, or atomic number. We need to return the symbol, name, atomicNumber, atomicMass, phase, meltingPoint, boilingPoint, density, and electronegativity.
  // We can use the PeriodicTable.json file to get the data we need.

  const symbol = inputValues.symbol;
  const name = inputValues.name;
  const atomicNumber = inputValues.atomicNumber;

  const element = PeriodicTable.elements.find(
    (element) =>
      element.symbol === symbol.string ||
      element.name === name.string ||
      element.atomicNumber === atomicNumber.number
  );
  if (element) {
    return {
      symbol: element.symbol,
      name: element.name,
      atomicNumber: element.number,
      atomicMass: element.atomic_mass,
      phase: element.phase,
      meltingPoint: element.meltingPoint,
      boilingPoint: element.boilingPoint,
      density: element.density,
      electronegativity: element.electronegativity_pauling,
    };
  }
  return {};
};

export default PeriodicTableDataSource;
