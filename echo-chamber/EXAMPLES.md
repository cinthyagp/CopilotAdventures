# Echo Chamber - Usage Examples & Developer Guide

## 🎯 Quick Examples

### Running with npm

```bash
# Start interactive mode
npm start

# Run automated tests
npm test
```

### Example Session

```
$ node index.js

╔═══════════════════════════════════════════════════════════════╗
║                  🏰 THE ECHO CHAMBER 🏰                       ║
║  Welcome, seeker of patterns! You have entered the Echo       ║
║  Chamber, a mystical room where numerical sequences echo      ║
║  through eternity...
╚═══════════════════════════════════════════════════════════════╝

📖 What would you like to do?

  1) Test the sample sequence [3, 6, 9, 12]
  2) Enter your own sequence
  3) View all echo memories
  4) Run all test cases
  5) Exit the Echo Chamber

Enter your choice (1-6): 1

🔮 Analyzing the sample sequence...

  ✅ Valid Arithmetic Progression Detected!
  📊 Sequence: [3, 6, 9, 12]
  📈 Common Difference: 3
  🎯 Next Number in Sequence: ➡️ 15
  💾 Memory stored as Echo #1
```

## 📚 Developer Guide

### Understanding the Code Structure

#### Core Class: `ArithmeticSequencePredictor`

```javascript
const predictor = new ArithmeticSequencePredictor();

// Validate a sequence
const validation = predictor.validateSequence([2, 4, 6, 8]);
// Returns: { isValid: true, commonDifference: 2, error: null }

// Predict the next number
const result = predictor.predictNext([2, 4, 6, 8]);
// Returns: { success: true, prediction: 10, error: null, memory: {...} }

// View all memories
const memories = predictor.getMemories();
// Returns: array of all previous predictions

// Clear memories
predictor.clearMemories();
```

#### Core Class: `EchoChamberInterface`

```javascript
const chamber = new EchoChamberInterface();

// Start interactive mode
chamber.start();

// Process a sequence
chamber.processSequence([5, 10, 15, 20], 'custom sequence');

// Run all tests
chamber.runTestCases();

// Parse user input
const result = chamber.parseSequenceInput('1,2,3,4,5');
// Returns: { success: true, sequence: [1,2,3,4,5], error: null }
```

## 🧪 Test Case Results

All test cases pass successfully:

### Valid Sequences (7 tests)
✅ [3, 6, 9, 12] → 15
✅ [1, 2, 3, 4, 5] → 6
✅ [10, 20, 30, 40] → 50
✅ [100, 95, 90, 85] → 80
✅ [0, 0, 0, 0] → 0
✅ [-5, -3, -1, 1] → 3
✅ [50, 40, 30, 20, 10] → 0

### Error Handling (5 tests)
✅ [1, 2, 4] - Correctly identified as non-arithmetic
✅ [5] - Correctly rejected (too few elements)
✅ [] - Correctly rejected (empty array)
✅ ['a', 'b', 'c'] - Correctly rejected (non-numeric)
✅ [1, 3, 5, 7, 10] - Correctly identified as non-arithmetic

### Validation Features
✅ Input type checking
✅ Minimum length validation
✅ Numeric type validation
✅ Common difference verification
✅ Detailed error messages

## 🎓 Learning Paths

### For Beginners
1. Run the sample sequence test
2. Try entering simple sequences like [2, 4, 6, 8]
3. View memories to understand the output format
4. Run error handling tests to see validation in action

### For Intermediate Learners
1. Create progressions with negative numbers: [-10, -5, 0, 5, 10]
2. Test edge cases like zero difference: [5, 5, 5, 5]
3. Try larger numbers and differences
4. Examine the code to understand the algorithm

### For Advanced Developers
1. Extend the predictor to handle geometric progressions
2. Add support for predicting multiple future numbers
3. Implement different sequence types (Fibonacci, prime numbers)
4. Create a graphical visualization of sequences
5. Build a REST API wrapper for the predictor

## 🔧 Extending the Application

### Adding New Sequence Types

```javascript
/**
 * Add geometric progression support
 */
validateGeometricSequence(sequence) {
  // First term must not be zero
  if (sequence[0] === 0) {
    return { isValid: false, error: 'First term cannot be zero' };
  }

  const ratio = sequence[1] / sequence[0];
  
  for (let i = 2; i < sequence.length; i++) {
    if (sequence[i] / sequence[i-1] !== ratio) {
      return { isValid: false, error: 'Not a geometric progression' };
    }
  }

  return { isValid: true, commonRatio: ratio };
}
```

### Adding Multi-Prediction

```javascript
/**
 * Predict multiple future numbers
 */
predictMultiple(sequence, count) {
  const result = this.predictNext(sequence);
  if (!result.success) return result;

  const predictions = [result.prediction];
  let current = result.prediction;
  
  for (let i = 1; i < count; i++) {
    current += result.memory.commonDifference;
    predictions.push(current);
  }

  return {
    success: true,
    predictions: predictions,
    memory: result.memory
  };
}
```

## 📊 Architecture Overview

```
EchoChamberInterface (User Interaction)
         ↓
    User Input Parsing
         ↓
ArithmeticSequencePredictor (Core Logic)
    ├── validateSequence()
    ├── predictNext()
    └── Memory Management
         ↓
    Console Output & Storage
```

## 🎯 Features Checklist

- [x] Arithmetic sequence validation
- [x] Next number prediction
- [x] Memory/history tracking
- [x] Input validation
- [x] Error handling with detailed messages
- [x] Interactive console interface
- [x] Fantasy-themed presentation
- [x] Comprehensive test suite
- [x] Automated test mode
- [x] Command-line argument support
- [x] Multiple sequence testing
- [x] Memory display functionality
- [x] Memory clearing functionality

## 💡 Performance Notes

- **Time Complexity**: O(n) for validation, O(1) for prediction
- **Space Complexity**: O(m) where m = number of stored memories
- **Scalability**: Can handle thousands of sequences without performance issues

## 🐛 Troubleshooting

### Issue: "node: command not found"
**Solution**: Install Node.js from https://nodejs.org/

### Issue: Input not being accepted
**Solution**: Make sure to press Enter after typing your input

### Issue: Unexpected predictions
**Solution**: Check that your sequence follows an arithmetic pattern (constant difference)

## 📞 Support & Contribution

This project is part of the CopilotAdventures educational repository. For questions or improvements, refer to the main repository documentation.

---

**May your patterns be clear and your predictions accurate!** 🏰✨
