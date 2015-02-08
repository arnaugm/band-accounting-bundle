<?php

namespace RootDiamoons\BandAccountingBundle\Controller;

use RootDiamoons\BandAccountingBundle\Entity\Activity;
use RootDiamoons\BandAccountingBundle\Form\ActivityType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints\DateTime;

class ActivityController extends Controller
{
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();
        $repository = $em->getRepository('RootDiamoonsBandAccountingBundle:Activity');

        $activities = $repository->findBy(array(), array('dateValue' => 'DESC'));

        return $this->render('RootDiamoonsBandAccountingBundle:Activity:index.html.twig', array(
            'activities' => $activities
        ));
    }

    public function newAction()
    {
        $activity = new Activity();
        $activity->setDateValue(new \DateTime());
        $form = $this->createForm(new ActivityType(), $activity);

        return $this->render('RootDiamoonsBandAccountingBundle:Activity:new.html.twig', array(
            'form' => $form->createView(),
        ));
    }

    public function createAction(Request $request)
    {
        $activity = new Activity();
        $form = $this->createForm(new ActivityType(), $activity);

        $form->handleRequest($request);

        $em = $this->getDoctrine()->getManager();

        if ($form->isValid()) {

            $em->persist($activity);
            $em->flush();
        }

        return $this->redirect($this->generateUrl('root_diamoons_band_accounting_activity'));
    }
}
