import { ProblemSpec, RoundId, PowerCardState } from './types';

export const ROUND_SPECS: Record<RoundId, ProblemSpec> = {
  round1_a: {
    id: 'round1_a',
    roundTitle: 'ROUND 1',
    activityTitle: 'Activity A: Dumb Charades + Code',
    durationMinutes: 15,
    maxPoints: 50,
    description: `One team member will act out the given movie using gestures, and the other team member must identify it and write the required C program.`,
    constraints: [],
    sampleInput: '',
    sampleOutput: '',
    explanation: '',
    starterCode: `#include <stdio.h>

int main() {
    // Write your C program here
    
    return 0;
}
`,
    testCases: []
  },

  round1_b: {
    id: 'round1_b',
    roundTitle: 'ROUND 1',
    activityTitle: 'Activity B: Check Even/Odd Number',
    durationMinutes: 15,
    maxPoints: 50,
    description: `Check Even/Odd Number Using C Programming

Problem Statement:
Write a C program to check whether a given integer is Even or Odd.

Input:
A single integer N.

Output:
Print "Even" if N is even.
Print "Odd" if N is odd.

Example:
Input: 10
Output: Even

Input: 7
Output: Odd`,
    constraints: [
      'Input: Single integer N via standard input',
      'Output matches exact case: "Even" or "Odd"',
      'Time Limit: 2.5 seconds per test case'
    ],
    sampleInput: `10`,
    sampleOutput: `Even`,
    explanation: '10 is divisible by 2 with no remainder, so it is Even.',
    starterCode: `#include <stdio.h>

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    
    // Write your code here to check whether n is Even or Odd:
    
    return 0;
}
`,
    testCases: [
      {
        input: `10`,
        expectedOutput: `Even\n`,
        description: 'Sample 1: Even integer (10)'
      },
      {
        input: `7`,
        expectedOutput: `Odd\n`,
        description: 'Sample 2: Odd integer (7)'
      },
      {
        input: `0`,
        expectedOutput: `Even\n`,
        description: 'Test 3: Zero is Even (0)'
      },
      {
        input: `42`,
        expectedOutput: `Even\n`,
        description: 'Test 4: Even integer (42)'
      },
      {
        input: `99`,
        expectedOutput: `Odd\n`,
        description: 'Test 5: Odd integer (99)'
      }
    ]
  },

  round2: {
    id: 'round2',
    roundTitle: 'ROUND 2',
    activityTitle: 'Debugging Challenge (Find & Fix 10 Bugs)',
    durationMinutes: 20,
    maxPoints: 100,
    description: `The following C program is designed to analyze student test scores:
1. Read N (number of scores).
2. Read N integer scores.
3. Compute the minimum score, maximum score, and integer average.
4. Count how many scores are strictly above the average.
5. Print in format:
Min: <MIN>
Max: <MAX>
Avg: <AVG>
Above: <COUNT>

CRITICAL: The given starter code contains EXACTLY 10 BUGS ranging from missing syntax, invalid pointers, off-by-one errors, uninitialized sums, wrong format specifiers, and bad comparisons.
Locate and fix all 10 bugs, then run and submit the working code! Score incorporates completion speed.`,
    constraints: [
      '1 <= N <= 100',
      '0 <= Score <= 100',
      'All outputs on new lines matching exact template',
      'Time Limit: 2.5 seconds per test case'
    ],
    sampleInput: `5
70 85 90 60 75`,
    sampleOutput: `Min: 60
Max: 90
Avg: 76
Above: 2`,
    explanation: 'Scores 70,85,90,60,75 have Min=60, Max=90, Sum=380, Avg=380/5=76. Scores strictly above 76 are 85 and 90 (Count: 2).',
    starterCode: `// ROUND 2: DEBUGGING CHALLENGE
// THIS CODE CONTAINS 10 BUGS. FIND AND FIX ALL OF THEM!

#include <stdio.h>

int main() {
    int n
    // BUG 1: Missing semicolon above

    if (scanf("%d", n) != 1) { // BUG 2: Missing address-of (&n)
        return 0;
    }

    int scores[100];
    int sum; // BUG 3: Uninitialized sum variable!

    // BUG 4: Off-by-one loop bound (<= n instead of < n)
    for (int i = 0; i <= n; i++) {
        int v;
        scanf("%d", v); // BUG 5: Missing address-of (&v)
        scores[i] = v;
        sum += scores[i];
    }

    int min_val = 1000;
    int max_val = -1;

    for (int i = 0; i < n; i++) {
        if (scores[i] < min_val) {
            min_val = scores[i];
        }
        if (scores[i] < max_val) { // BUG 6: Logic error (should be > max_val)
            max_val = scores[i];
        }
    }

    int avg = sum / (n - 1); // BUG 7: Wrong denominator (should be n, not n - 1)

    int above_count = 0;
    for (int i = 0; i < n; i++) {
        if (scores[i] >= avg) { // BUG 8: Says strictly above in spec (> avg, not >=)
            above_count++;
        }
    }

    // BUG 9 & 10: Wrong format specifiers in print outputs
    printf("Min: %s\\n", min_val); // BUG 9: %s instead of %d
    printf("Max: %d\\n", max_val);
    printf("Avg: %d\\n", avg);
    printf("Above: %f\\n", above_count); // BUG 10: %f instead of %d

    return 0;
}
`,
    testCases: [
      {
        input: `5\n70 85 90 60 75`,
        expectedOutput: `Min: 60\nMax: 90\nAvg: 76\nAbove: 2\n`,
        description: 'Sample 1: Standard dataset'
      },
      {
        input: `4\n10 20 30 40`,
        expectedOutput: `Min: 10\nMax: 40\nAvg: 25\nAbove: 2\n`,
        description: 'Test 2: Monotonic sequence'
      },
      {
        input: `1\n88`,
        expectedOutput: `Min: 88\nMax: 88\nAvg: 88\nAbove: 0\n`,
        description: 'Test 3: Single element'
      }
    ]
  },

  round3: {
    id: 'round3',
    roundTitle: 'ROUND 3',
    activityTitle: 'Final Coding Race: Print the Given Star Pattern',
    durationMinutes: 30,
    maxPoints: 150,
    description: `FINAL CODING RACE: Print the Given Star Pattern

Write a C program to display the exact star pattern shown below using nested loops.
First team to submit a correct solution wins the race!

REFERENCE STAR PATTERN:
    *
   ***
  *****
 *******
*********
 *******
  *****
   ***
    *

PATTERN STRUCTURE:
Row 1: 4 leading spaces + 1 star
Row 2: 3 leading spaces + 3 stars
Row 3: 2 leading spaces + 5 stars
Row 4: 1 leading space + 7 stars
Row 5: 0 leading spaces + 9 stars
Row 6: 1 leading space + 7 stars
Row 7: 2 leading spaces + 5 stars
Row 8: 3 leading spaces + 3 stars
Row 9: 4 leading spaces + 1 star

INPUT INSTRUCTIONS:
- You may read N from standard input (where N = 5 for this pattern), OR use loops to generate the 5-row diamond directly.
- Both methods are fully accepted!
- Standard test input supplies: 5`,
    constraints: [
      'Students must use loops (for / while) to generate the pattern',
      'Total pattern height is 9 rows (upper pyramid has N = 5 rows)',
      'Output matches the exact row alignment and star counts',
      'Time Limit: 2.5 seconds per test case'
    ],
    sampleInput: `5`,
    sampleOutput: `    *
   ***
  *****
 *******
*********
 *******
  *****
   ***
    *`,
    explanation: 'Symmetric diamond pattern with N = 5 rows in the upper half and 4 rows in the lower half.',
    starterCode: `#include <stdio.h>

int main() {
    int n = 5;
    // Optional: read n from input:
    // scanf("%d", &n);

    // Write your nested loop logic below to print the star pattern:
    
    return 0;
}
`,
    testCases: [
      {
        input: `5`,
        expectedOutput: `    *\n   ***\n  *****\n *******\n*********\n *******\n  *****\n   ***\n    *\n`,
        description: 'Reference Pattern: N = 5 Diamond'
      }
    ]
  }
};

export const AVAILABLE_POWER_CARDS: PowerCardState[] = [
  {
    cardId: 'flashbang',
    name: 'Flashbang',
    description: 'Imposes an active modified constraint on the team editor for testing adaptability.',
    icon: 'EyeOff',
    isPositive: false,
    costPoints: 20
  },
  {
    cardId: 'freeze',
    name: 'Keyboard Freeze',
    description: 'Locks the C code editor for exactly 2 minutes (120 seconds). Timer continues running!',
    icon: 'Snowflake',
    isPositive: false,
    costPoints: 40
  },
  {
    cardId: 'shield',
    name: 'Shield',
    description: 'Protects the team by deflecting and nullifying the next negative Power Card.',
    icon: 'Shield',
    isPositive: true,
    costPoints: 30
  },
  {
    cardId: 'timewarp',
    name: 'Time Warp (-5m)',
    description: 'Penalizes team by subtracting 5 minutes (300 seconds) from the remaining countdown.',
    icon: 'ClockBackward',
    isPositive: false,
    costPoints: 35
  },
  {
    cardId: 'turboboost',
    name: 'Turbo Boost (+5m)',
    description: 'Grants 5 bonus minutes (300 seconds) to the remaining Round 3 countdown timer.',
    icon: 'Zap',
    isPositive: true,
    costPoints: 25
  }
];

export const TEAMS_LIST = Array.from({ length: 22 }, (_, i) => {
  const num = String(i + 1).padStart(2, '0');
  return `Team ${num}`;
});
