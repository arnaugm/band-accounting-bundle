<?php

namespace Tests\RootDiamoons\BandAccountingBundle\Terms;

use DateTime;
use DateTimeZone;
use Mockery as m;
use PHPUnit\Framework\TestCase;
use RootDiamoons\BandAccountingBundle\Terms\Terms;

class TermsTest extends TestCase
{
    /**
     * @var Terms
     */
    private $terms;

    /**
     * {@inheritDoc}
     */
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

        $this->terms = m::mock('RootDiamoons\BandAccountingBundle\Terms\Terms')
            ->makePartial()
            ->shouldReceive('getCurrentMonth')
            ->andReturn($month)
            ->getMock()
            ->shouldReceive('getCurrentYear')
            ->andReturn('2017')
            ->getMock();
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
        $this->terms = new Terms();
        $expectedCurrentMonth = (new DateTime('', new DateTimeZone('UTC')))->format('n');

        $currentMonth = $this->terms->getCurrentMonth();

        $this->assertSame($expectedCurrentMonth, $currentMonth);
    }

    public function testGetCurrentYear()
    {
        $this->terms = new Terms();
        $expectedCurrentYear = (new DateTime('', new DateTimeZone('UTC')))->format('Y');

        $currentYear = $this->terms->getCurrentYear();

        $this->assertSame($expectedCurrentYear, $currentYear);
    }
}
