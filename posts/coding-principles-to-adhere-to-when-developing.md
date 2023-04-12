---
id: "15"
title: "Coding Principles to Adhere to when Developing"
date: "12 April 2023"
excerpt: "These principles are like guiding lights that ensure that your code is of high quality, easily maintainable, and adaptable to changing requirements?"
imageSrc: "/images/coding-principles-img.webp"
author: "Ej"
tags: ["technology", "programming", "code"]
---

## YAGNI - You ain't gonna need it

- Don't build something that you are not sure yet will be needed. Start by understanding the problem, not by building the solution. This will help you to focus on what is actually needed.

## WET - Write everything twice

- Don't create an abstraction that you don't need yet. Need to solve a problem? Just solve it. Need to solve it again? Just solve it again, duplication of code is fine. Need to solve it a third time? Now, instead of writing the same code a third time, refactor the existing two instances to use an abstraction, and use this abstraction for the third time you need it.

## TDD - Test drive design

- This basically is YAGNI and WET on a code level: First think about what you need, understand the problem, and formulate it as a test. Then just solve this test, no unnecessary abstractions or additional features.
- Each block of code on the same level of abstraction
- Make sure that each function/class/file is on the same level of abstraction. If a function is handling business logic, then every line in there should be easy to understand by a non-dev that knows your business. `isEmpty(post)` instead of `post.body === ''`. The same the other way around: If a function is handling Web technologies, then every line should be easy to understand by a web dev that does not know your business. Don't mix `post.body === ''` into a function whose job it is to send an AJAX request.
- `Do automated testing`
  - this way the intended design is FULFILLED, other deviations from the intended design is an error.

## KISS - Keep it stupid simple

- Don’t make something more complicated than it needs to be
- Simple is beautiful, Beautiful is pure, Pure is testable and readable, Testable and readable is correct
- Simple and Consistent

## DRY - Don't repeat yourself

- It you need to repeat or use a block of code again and again, encapsulate it in a function or some sort
- Stand on the shoulder of giants
  - Use existing libraries that handles the complexity for you
  - Don’t reinvent the wheel
    - Your time should be allocated to the unique problem you’re dealing with, not problems that are already been solved by others

1. **Tests acrete** - If you have a code base that has low test coverage, you don't need to drop everything to improve your coverage. Instead, write tests as you discover bugs, or create new features. Over time you will have a suite of useful tests, it just takes time. Also, delete tests that are just getting in the way and aren't helping.
2. **Make it easy to test** - Every little bit of friction that there is in writing tests, increases the likelyhood that when push comes to shove and you have a deadline, that tests just won't be written. So spend the effort in improving your developer experience in writing tests.
3. **At least write one test** - Say you've written some fairly straight forward, but verbose component (eg. a form). Writing tests on every variation of what could happen might be a waste of time (see 'Tests acrete'). But at least write one test, so that when/if a bug does occur, it makes it easier for the developer write new tests, by following what you did (see: "Future developers are going to copy what they see here').
4. **It's more important for your code to be testable, than it is for it to be actually tested**
   - Writing testable code is more than just about being able to have tests. Testable code also tends to be more extensible, and easier to understand how to use.
   - Of course, to develop the skill of writing testable code, you need to write tests.
5. **Make non-breaking changes** - If a change you are making to a component requires you to go back and fix code in a bunch of places that were calling it, it's a breaking change. Instead - keep the old functionality in, mark it deprecated, and provide new functionality. In VSCode the deprecated code will show up with strikethrough. This might mean that you have MyWidget1 (deprecated) MyWidget2 (deprecated) MyWidget3 (current). This is absolutely fine. You can periodically find out what components/props are still being used and go through and delete them then. You may be worried about leaving your code base messy, but the alternative is forever running in the mud of 'refactors'.
6. **Good code is easy to delete**. It doesn't matter if you write some hairy function that's arcane and hard to understand (especially if it has tests!). If it's easy to delete and replace with an alternative implementation, it's well designed code. Badly designed code is hard to delete because other parts of the application were relying that one function to do a thing, etc.
7. **Tests are documentation**. Your unit tests (and storybooks) should serve has documentation on how to use the component. A developer shouldn't need to dive in to the implementation to work out how to use it. (See 'good code is easy to delete'). Also, [you can write tests against your storybooks](https://storybook.js.org/docs/react/writing-tests/importing-stories-in-tests), which is fantastic because you get both a visual demo of the thing, as well as tests.
8. **Be pragmatic/don't let perfect be the enemy of good**. For example, recently I've been discovering that while Cypress isn't a perfect solution for testing, it gets the job done, and I'd much rather have what I do have, than no tests at all.
9. **Future developers, including yourself, are going to copy what they see here.** In any unfamiliar codebase, (including yourself in six months time), developers are just going to see how you've done it, and repeat that. This means that:
   - If you're going to do something hacky, point it out with a big comment to hopefully discourage them.
   - Think about the example you are setting.

By adhering to these coding principles and practicing testing and debugging, developers can create high-quality code that is easy to maintain, adaptable to changing requirements, and performs as expected.
