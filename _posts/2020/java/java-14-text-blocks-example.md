# Java 14 Text Blocks

In Java, to embed HTML, XML, SQL, or JSON snippet into a code is often hard to read and hard to keep, and to overcome this problem, Java 14 has introduced Text Block.

A text block contains zero or more content characters, which are enclosed by open and close delimiters.

HTML Example Without Text Block
String html = "<html>\n" +
              "    <body>\n" +
              "        <p>Hello, world</p>\n" +
              "    </body>\n" +
              "</html>\n";
The opening delimiter is a sequence of three double quote characters (""") followed by zero or more white spaces followed by a line terminator. The content begins at the first character after the line terminator of the opening delimiter.

The closing delimiter is a sequence of three double quote characters. The content ends at the last character before the first double quote of the closing delimiter.

The content may include double quote characters directly, unlike the characters in a string literal. The use of \" in a text block is permitted, but not necessary or recommended. Fat delimiters (""") were chosen so that " characters could appear unescaped, and also to visually distinguish a text block from a string literal.

A text block is a multi-line string literals which prevents the need for most escape sequences, formats the string automatically, and allows the developer and gives control to format the string if necessary.

HTML Example With Text Block
String html = """
              <html>
                  <body>
                      <p>Hello, world</p>
                  </body>
              </html>
              """;
In early 2019, JEP 355 proposed text blocks as a follow-up to the JEP 326 (Raw String literals) exploration, which had been withdrawn.

In mid-2019, JDK 13 introduced Text Block Preview feature, which then re-visited by adding below two new escape sequences in Java 14.

Two new escape sequences are newlines (line-terminator) denoted by \ and second is for white space (single space) denoted by /s.

Newlines Example:
// Without Text Block
String literal = "two escape sequences first is for newlines " +
"and, second is to signify white space " +
"or single space.";

// With the \<line-terminator> escape sequence this could be expressed as:
String text = """
                two escape sequences first is for newlines \
                and, second is to signify white space \
                or single space.\
                """;
White Space or Single Space Example:
// Using \s at the end of each line in this example guarantees that each line is exactly six characters long
String colors = """
    aaa\s
    bbb\s
    ccc\s
    """;
