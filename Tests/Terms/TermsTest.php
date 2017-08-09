<?php

namespace Tests\ArnauGM\BandAccountingBundle\Terms;

use DateTime;
use DateTimeZone;
use Mockery as m;
use PHPUnit\Framework\TestCase;
use ArnauGM\BandAccountingBundle\Terms\Terms;

class TermsTest extends TestCase
{
    /**
     * @var Terms
     */
    private $terms;

    protected function setUp()
    {
        $this->terms = new Terms();
    }

    protected function tearDown()
    {
        m::close();
    }

    public function setupTermMock($term)
    {
        $month = '';

        switch($term) {
            case 1:
                $month = '03';
                break;
            case 2:
                $month = '06';
                break;
            case 3:
                $month = '09';
                break;
            case 4:
                $month = '12';
                break;
        }

        $this->terms = m::mock('ArnauGM\BandAccountingBundle\Terms\Terms')
            ->makePartial()
            ->shouldReceive('getCurrentMonth')
            ->andReturn($month)
            ->getMock()
            ->shouldReceive('getCurrentYear')
            ->andReturn('2017')
            ->getMock();
    }

    /**
     * @expectedException \InvalidArgumentException
     */
    public function testGetInitialDateFromFilterNull()
    {
        $this->terms->getInitialDateFromFilter(null);
    }

    /**
     * @dataProvider termsAndFiltersProvider
     * @param $currentTerm
     * @param $filter
     * @param $expectedInitialDate
     * @param $expectedFilterMessage
     * @param $expectedTermMessage
     */
    public function testGetInitialDateFromFilter($filter, $currentTerm, $expectedInitialDate, $expectedFilterMessage, $expectedTermMessage)
    {
        $this->setupTermMock($currentTerm);

        $initialDate = $this->terms->getInitialDateFromFilter($filter);

        $this->assertSame(
            $expectedInitialDate,
            $initialDate,
            'Initial date does not correspond with ' . $expectedFilterMessage . ' when we are in the ' . $expectedTermMessage . ' of the year'
        );
    }

    public function termsAndFiltersProvider()
    {
        return array(
            array(1, 1, '2017-01-01', 'current term filter', 'first term'),
            array(1, 2, '2017-04-01', 'current term filter', 'second term'),
            array(1, 3, '2017-07-01', 'current term filter', 'third term'),
            array(1, 4, '2017-10-01', 'current term filter', 'fourth term'),
            array(2, 1, '2016-10-01', 'two terms filter', 'first term'),
            array(2, 2, '2017-01-01', 'two terms filter', 'second term'),
            array(2, 3, '2017-04-01', 'two terms filter', 'third term'),
            array(2, 4, '2017-07-01', 'two terms filter', 'fourth term'),
            array(3, 1, '2016-07-01', 'three terms filter', 'first term'),
            array(3, 2, '2016-10-01', 'three terms filter', 'second term'),
            array(3, 3, '2017-01-01', 'three terms filter', 'third term'),
            array(3, 4, '2017-04-01', 'three terms filter', 'fourth term'),
            array(4, 1, '2016-04-01', 'four terms filter', 'first term'),
            array(4, 2, '2016-07-01', 'four terms filter', 'second term'),
            array(4, 3, '2016-10-01', 'four terms filter', 'third term'),
            array(4, 4, '2017-01-01', 'four terms filter', 'fourth term'),
        );
    }

    public function testGetCurrentMonth()
    {
        $expectedCurrentMonth = (new DateTime('', new DateTimeZone('UTC')))->format('n');

        $currentMonth = $this->terms->getCurrentMonth();

        $this->assertSame($expectedCurrentMonth, $currentMonth);
    }

    public function testGetCurrentYear()
    {
        $expectedCurrentYear = (new DateTime('', new DateTimeZone('UTC')))->format('Y');

        $currentYear = $this->terms->getCurrentYear();

        $this->assertSame($expectedCurrentYear, $currentYear);
    }

    /**
     * @dataProvider getTermProvider
     * @param $month
     * @param $expectedTerm
     */
    public function testGetTerm($month, $expectedTerm)
    {
        $term = $this->terms->getTerm($month);

        $this->assertSame(
            $expectedTerm,
            $term,
            'The term does not correspond to the given month'
        );
    }

    public function getTermProvider()
    {
        return array(
            array(1, 1),
            array(2, 1),
            array(3, 1),
            array(4, 2),
            array(5, 2),
            array(6, 2),
            array(7, 3),
            array(8, 3),
            array(9, 3),
            array(10, 4),
            array(11, 4),
            array(12, 4),
        );
    }

    /**
     * @dataProvider subtractTermsProvider
     * @param $initialTerm
     * @param $numTerms
     * @param $expectedTermAndLoops
     */
    public function testSubtractTerms($initialTerm, $numTerms, $expectedTermAndLoops)
    {
        $termAndLoops = $this->terms->subtractTerms($initialTerm, $numTerms);

        $this->assertSame(
            $expectedTermAndLoops,
            $termAndLoops,
            'Terms not subtracted correctly'
        );
    }

    public function subtractTermsProvider()
    {
        return array(
            array(1, 0, array(1, 0)),
            array(2, 1, array(1, 0)),
            array(1, 1, array(4, 1)),
            array(1, 2, array(3, 1)),
            array(1, 5, array(4, 2)),
        );
    }
}
