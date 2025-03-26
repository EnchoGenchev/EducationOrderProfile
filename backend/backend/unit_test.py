import unittest
from features.sort import sort, Teacher

# Simple function to test
def simple_method():
    return "pass"

# Test the sort function in test.py
class TestSort(unittest.TestCase):

    def tests_sort(self):
        people = [
        Teacher("Charlie", "Science"),    
        Teacher("Bob", "English"),
        Teacher("Alice", "Math")
        ]
        sort(people, key_function=lambda p: p.name.lower())
        expected_names = ["Alice" , "Bob", "Charlie"]
        sorted_names = [teacher.name for teacher in people]
        self.assertEqual(sorted_names, expected_names)

# Test case
class TestSimpleMethod(unittest.TestCase):

    def test_simple_method(self):
        self.assertEqual(simple_method(), "pass")

# Run the test
if __name__ == "__main__":
    unittest.main()