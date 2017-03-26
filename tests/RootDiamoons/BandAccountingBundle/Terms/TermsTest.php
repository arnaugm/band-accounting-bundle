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

    public function testGetInitialDateFromCurrentTermFilterInTheFirstTerm()
    {
        $this->setupTermMock(1);

        $initialDate = $this->terms->getInitialDateFromFilter(1);

        $this->assertSame(
            '2017-01-01',
            $initialDate,
            'Initial date does not correspond with current term filter in the first term'
        );
    }

    public function testGetInitialDateFromCurrentTermFilterInTheSecondTerm()
    {
        $this->setupTermMock(2);

        $initialDate = $this->terms->getInitialDateFromFilter(1);

        $this->assertSame(
            '2017-04-01',
            $initialDate,
            'Initial date does not correspond with current term filter in the second term'
        );
    }

    public function testGetInitialDateFromCurrentTermFilterInTheThirdTerm()
    {
        $this->setupTermMock(3);

        $initialDate = $this->terms->getInitialDateFromFilter(1);

        $this->assertSame(
            '2017-07-01',
            $initialDate,
            'Initial date does not correspond with current term filter in the third term'
        );
    }

    public function testGetInitialDateFromCurrentTermFilterInTheFourthTerm()
    {
        $this->setupTermMock(4);

        $initialDate = $this->terms->getInitialDateFromFilter(1);

        $this->assertSame(
            '2017-10-01',
            $initialDate,
            'Initial date does not correspond with current term filter in the fourth term'
        );
    }

    public function testGetInitialDateFromTwoTermsFilterInTheFirstTerm()
    {
        $this->setupTermMock(1);

        $initialDate = $this->terms->getInitialDateFromFilter(2);

        $this->assertSame(
            '2016-10-01',
            $initialDate,
            'Initial date does not correspond with two terms filter in the first term'
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
