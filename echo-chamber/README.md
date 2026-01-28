# 🏰 The Echo Chamber - Arithmetic Sequence Predictor

Welcome to the Echo Chamber, a mystical adventure where arithmetic sequences echo through eternity and patterns reveal their secrets!

## 📖 Overview

The Echo Chamber is an interactive Node.js application that teaches sequence prediction and pattern recognition. It implements an arithmetic sequence predictor that:

- ✅ Validates arithmetic progressions
- 🔮 Predicts the next number in any sequence
- 💾 Stores "memories" of previous echoes
- 🛡️ Provides comprehensive error handling
- 🎮 Offers an engaging fantasy-themed console interface

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

```bash
# Navigate to the echo-chamber directory
cd /workspaces/CopilotAdventures/echo-chamber

# No external dependencies needed! The project uses only Node.js built-in modules
```

### Running the Application

#### Interactive Mode (Default)
```bash
node index.js
```

This launches the interactive Echo Chamber where you can:
1. Test the sample sequence [3, 6, 9, 12]
2. Enter your own sequences
3. View stored memories
4. Clear memories
5. Run comprehensive test cases
6. Exit the chamber

#### Automated Test Mode
```bash
node index.js --test
```

This runs all tests automatically without requiring user interaction and exits:
- Sample sequence test
- All predefined test cases
- Error handling verification
- Memory display

## 🎮 How to Use

### Interactive Menu

When you run the application in interactive mode, you'll see:

```
📖 What would you like to do?

  1) Test the sample sequence [3, 6, 9, 12]
  2) Enter your own sequence
  3) View all echo memories
  4) Clear all memories
  5) Run all test cases
  6) Exit the Echo Chamber
```

### Option 1: Test Sample Sequence
Instantly tests the predefined sequence [3, 6, 9, 12] and predicts the next number should be 15.

### Option 2: Enter Custom Sequence
Enter any arithmetic progression as comma-separated values:
```
Enter a sequence: 2,4,6,8
```

### Option 3: View Memories
Displays all previously analyzed sequences with their:
- Echo number
- Input sequence
- Common difference
- Predicted next number
- Timestamp

### Option 4: Clear Memories
Resets all stored memories in the Echo Chamber.

### Option 5: Run All Tests
Executes comprehensive test cases including:
- Valid arithmetic progressions
- Edge cases (zero progression, negative numbers)
- Invalid input handling
- Error detection

### Option 6: Exit
Leaves the Echo Chamber and closes the application.

## 📊 Test Cases

The application includes 7 predefined test cases:

| Test Case | Sequence | Expected Next Number |
|-----------|----------|----------------------|
| Basic Test | [3, 6, 9, 12] | 15 |
| Increment by 1 | [1, 2, 3, 4, 5] | 6 |
| Increment by 10 | [10, 20, 30, 40] | 50 |
| Decrement by 5 | [100, 95, 90, 85] | 80 |
| Zero Progression | [0, 0, 0, 0] | 0 |
| Negative to Positive | [-5, -3, -1, 1] | 3 |
| Descending Sequence | [50, 40, 30, 20, 10] | 0 |

### Error Handling Tests

The application also validates error handling with:
- Non-arithmetic progressions [1, 2, 4]
- Single element sequences [5]
- Empty arrays []
- Non-numeric values ['a', 'b', 'c']
- Mixed patterns [1, 3, 5, 7, 10]

## 📝 Code Structure

### Main Classes

#### `ArithmeticSequencePredictor`
Core prediction engine with methods:
- `validateSequence(sequence)` - Validates arithmetic progressions
- `predictNext(sequence)` - Predicts the next number
- `getMemories()` - Retrieves all stored memories
- `clearMemories()` - Clears the memory store
- `displayMemories()` - Displays formatted memory output

#### `EchoChamberInterface`
User interface handler with methods:
- `displayWelcome()` - Shows fantasy-themed welcome
- `displayMenu()` - Shows interactive menu
- `parseSequenceInput(input)` - Parses user input
- `processSequence(sequence, label)` - Processes and displays results
- `runTestCases()` - Runs all predefined tests
- `testErrorHandling()` - Validates error handling
- `start()` - Launches interactive mode

## 🎯 How Arithmetic Progressions Work

An **arithmetic progression** is a sequence where the difference between consecutive terms is constant.

### Example:
```
Sequence: [3, 6, 9, 12]
Differences: 6-3=3, 9-6=3, 12-9=3
Common Difference: 3
Next Number: 12 + 3 = 15
```

### Formula:
```
If a₁, a₂, a₃, ... is an arithmetic sequence with common difference d:
aₙ = a₁ + (n-1)d
Next term = Last term + d
```

## 🛡️ Error Handling

The application validates:
- Input is an array
- Sequence has at least 2 elements
- All elements are valid numbers
- All consecutive differences equal the common difference

If validation fails, you'll receive a clear error message explaining the issue.

## 📚 Example Sequences You Can Try

### Simple Progressions
- `2,4,6,8` → Next: 10
- `5,10,15,20` → Next: 25
- `100,90,80,70` → Next: 60

### Edge Cases
- `0,0,0,0` → Next: 0 (zero common difference)
- `-10,-5,0,5,10` → Next: 15 (crossing negative to positive)
- `1` → Error (too few elements)
- `1,2,4` → Error (not arithmetic)

## 🎨 Fantasy Theme

The Echo Chamber is presented as a mystical adventure location where:
- Sequences are called "echoes"
- Predictions are discovered by "seers"
- Memory storage represents "recordings in the chamber walls"
- Analysis is described with fantasy-themed emojis and language

This makes learning arithmetic sequences more engaging and memorable!

## 🧪 Running Tests

### Interactive Test Mode
```bash
node index.js
# Select option 5: Run all test cases
```

### Automated Test Mode
```bash
node index.js --test
```

### Expected Output
All test cases should show:
- ✅ indicators for valid sequences
- ❌ indicators for handled errors
- Correct predictions for each test case

## 📦 Dependencies

**None!** This project uses only Node.js built-in modules:
- `readline` - For console interaction

## 🔧 Customization

### Adding New Test Cases

Edit the `testCases` array in `EchoChamberInterface.runTestCases()`:

```javascript
const testCases = [
  { sequence: [your, sequence, here], name: 'Your Test Name' },
  // Add more test cases...
];
```

### Modifying the Interface

Change the welcome message, menu options, or output formatting in the `EchoChamberInterface` class methods.

## 🎓 Learning Outcomes

By exploring the Echo Chamber, you'll understand:
- ✅ What arithmetic progressions are
- ✅ How to identify the common difference
- ✅ How to predict the next term
- ✅ Input validation techniques
- ✅ Error handling strategies
- ✅ Interactive console design
- ✅ State management with memories

## 📞 Support

For issues or improvements, refer to the main CopilotAdventures repository documentation.

## 📄 License

This project is part of the CopilotAdventures repository and follows the same license terms.

---

**Welcome to the Echo Chamber. May your patterns be clear and your predictions true!** 🏰✨
