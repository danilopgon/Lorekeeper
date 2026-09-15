using FluentAssertions;

namespace Unit;

public class ApiProjectTests
{
    [Fact]
    public void TestAssemblyLoads()
    {
        typeof(Program).Assembly.GetName().Name.Should().Be("Api");
    }
}
